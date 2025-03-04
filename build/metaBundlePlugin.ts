/**
 * This Vite plugin augments the import.meta object with
 * a new `bundle` property that maps the chunk names to their
 * bundled path.
 *
 * I created it because I wasn't able to find a way to fetch
 * the final bundle path of a chunk dynamically without using
 * an import statement.
 *
 * This plugin statically replaces queries to the object with
 * their calculated values in place using an abstract syntax
 * tree, so the final bundle size is not affected.
 *
 * The end result is the ability to preload the main app bundle
 * without sacrificing the useful hashing behavior that's built
 * into Vite.
 */

import { Plugin as VitePlugin } from 'vite'
import { parse, print, visit, types } from 'recast'
import * as parser from 'recast/parsers/babel'

// Augment the type declaration for all modules
declare global {
  interface ImportMeta {
    bundle: Record<string, string>
  }
}

/** Returns true if a member expression matches the form `import.meta.bundle` */
function isImportMetaBundleStatement(node: types.namedTypes.MemberExpression) {
  const { object } = node

  /*
   * Note that the order of operations below is harder to read,
   * but each one is ordered to ensure property accesses on the
   * next checks don't fail.
   */

  /*
   * If the left hand side is not a member expression itself,
   * then it's not a match because it's of the form x.y instead of x.y.z
   */
  if (object.type !== 'MemberExpression') return false

  /*
   * This check ensures that the property of the left hand side is
   * the meta object, so `*.meta.*`.
   */
  if (object.object.type !== 'MetaProperty') return false

  /* Here we see if the original object is `import`, i.e. `import.meta.*` */
  if (object.object.meta.name !== 'import') return false

  /* Finally, we check if the property is `bundle`, i.e. `import.meta.bundle` */
  if (object.property.type !== 'Identifier') return false
  if (object.property.name !== 'bundle') return false

  /** All checks passed, the statement is a match */
  return true
}

function getMemberAccessName(node: types.namedTypes.MemberExpression) {
  const { property } = node

  // For cases matching the form x.y...
  if (property.type === 'Identifier') {
    // Return the identifier name
    return property.name
  }

  // For cases matchign the form x['y']...
  if (property.type === 'StringLiteral') {
    // Return the string value
    return property.value
  }

  // In all other cases, return empty string
  return ''
}

export default <VitePlugin>{
  name: 'vite-plugin-bundle-names',
  transform(code, id) {
    if (id.match(/.*\.(ts|js)(\?.*)?/)) {
      if (process.env.NODE_ENV === 'development') {
        // Parse the module code into an abstract syntax tree
        const ast = parse(code, {
          parser,
        })

        // terate over the entire tree, looking for the nodes we're interested in
        visit(ast, {
          visitMemberExpression(path) {
            // Check if the object is an import.meta.bundle statement
            if (isImportMetaBundleStatement(path.node)) {
              // Found a matching name, replace the node with nothing for dev
              path.replace(types.builders.identifier('undefined'))
            }

            // This required statement allows recast to continue traversing the tree
            this.traverse(path)
          },
        })

        // Replace the module content with the updated code
        return print(ast).code
      }
    }

    return code
  },
  generateBundle(_, bundle) {
    // Map bundle names to their final paths
    const names = Object.fromEntries(
      Object.entries(bundle)
        // Filter out non-chunk assets such as images
        .filter(([_, chunk]) => chunk.type === 'chunk')
        // Map the chunk to a key/value pair of its name and path
        .map(([_, chunk]) => [chunk.name, chunk.fileName]),
    )

    // Process each chunk of the final bundle
    for (const [_, chunk] of Object.entries(bundle)) {
      // Skip assets
      if (chunk.type !== 'chunk') continue
      if (chunk.name !== 'loader') continue

      // Parse the module code into an abstract syntax tree
      const ast = parse(chunk.code, {
        parser,
      })

      // terate over the entire tree, looking for the nodes we're interested in
      visit(ast, {
        visitMemberExpression(path) {
          // Check if the object is an import.meta.bundle statement
          if (isImportMetaBundleStatement(path.node)) {
            const value = getMemberAccessName(path.node)

            if (names[value]) {
              // Found a matching name, replace the node with the value
              path.replace(types.builders.stringLiteral(names[value]))
            } else {
              // No matching name, replace with undefined
              // This roughly matches the behavior of an object
              path.replace(types.builders.identifier('undefined'))
            }
          }

          // This required statement allows recast to continue traversing the tree
          this.traverse(path)
        },
      })

      // Replace the module content with the updated code
      chunk.code = print(ast).code
    }
  },
}
