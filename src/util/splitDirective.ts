import { Plugin as VuePlugin } from 'vue'

export type SplitDirectiveOptions = {
  /**
   * The type of element to wrap each child in, as a string.
   *
   * @default 'span'
   */
  wrapper?: string
  /** Any additional CSS class(es) to apply to each split element. */
  className?: string
  /**
   * An optional callback function to be called for each
   * inserted element as well as each original non-text node.
   *
   * @param element The element that was inserted or is being iterated over
   * @param index The index of the element in the parent node
   */
  iterate?: (element: HTMLElement, index: number) => void
}

export default <VuePlugin>{
  install(app) {
    // Declare a new directive that can be added to elements deriving from HTMLElement
    app.directive<HTMLElement>('split', {
      mounted(el, binding) {
        const { value } = binding
        const { wrapper } = value

        /**
         * Iterate over the directive element's children.
         *
         * This is important because other methods such as querySelector
         * will not return text nodes, only elements.
         */
        for (let i = 0; i < el.childNodes.length; i++) {
          const node = el.childNodes[i]
          const isTextNode = node.nodeType === 3

          if (isTextNode) {
            // Split the text node into individual characters and iterate
            for (const char of node.textContent?.split('') ?? []) {
              // Create a new element wit hthe character as content
              const newElement = document.createElement(wrapper ?? 'span')
              newElement.textContent = char

              // Assign any additional classes
              newElement.className = value.className ?? ''

              // Assign any data-v-* attributes from the parent, if any
              // This allows scoped CSS to be applied to the new nodes
              if (node.parentElement) {
                for (const attr of node.parentElement.attributes) {
                  if (attr.name.startsWith('data-v-')) {
                    newElement.setAttribute(attr.name, '')
                  }
                }
              }

              // Append the new element to the parent
              el.insertBefore(newElement, node)

              // Call the iterate function, if any
              value.iterate?.(newElement, i)
            }

            // Remove the original text node
            el.removeChild(node)
          } else if (node instanceof HTMLElement) {
            // If the node is not a #text node, just add the classes
            node.classList.add(...(value.className ?? '').split(' '))

            // Call the iterate function, if any
            value.iterate?.(node, i)
          }
        }
      },
    })
  },
}
