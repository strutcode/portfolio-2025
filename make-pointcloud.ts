// Open the input file from the command line
const input = Bun.file(process.argv[2])

if (!(await input.exists())) {
  console.error('File does not exist')
  process.exit(1)
}

// Read the input file
const content = await input.json()

// Convert to a buffer-backed typed array
const typedArray = Float32Array.from(content)

// Create the output file
const output = Bun.file('out.pc')

// Write the binary buffer to the output file
await output.writer().write(typedArray.buffer)
