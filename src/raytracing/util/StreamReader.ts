/** Provides a stream-like interface to an ArrayBuffer for easier read access. */
export default class StreamReader {
  private pointer = 0
  private view: DataView

  constructor(data: ArrayBuffer) {
    this.view = new DataView(data)
  }

  /** Sets the internal file pointer to `offset` */
  public seek(offset: number) {
    this.pointer = offset
  }

  /** Increments the internal file pointer by `offset` */
  public skip(offset: number) {
    this.pointer += offset
  }

  /** Decrements the internal file pointer by `offset` */
  public rewind(offset: number) {
    this.pointer -= offset
  }

  /**
   * Reads a single byte from the current file pointer as an unsigned integer
   * and increments the pointer.
   */
  public readUint8() {
    const v = this.peekUint8()
    this.pointer += 1
    return v
  }

  /** Reads a single byte from the current file pointer as a signed integer. */
  public peekUint8() {
    return this.view.getUint8(this.pointer)
  }

  /**
   * Reads a single byte from the current file pointer as an unsigned integer
   * and increments the pointer.
   */
  public readByte() {
    return this.readUint8()
  }

  /**
   * Reads `length` bytes as unsigned integers from the current file pointer and
   * returns a UInt8Array.
   */
  public readBytes(length: number) {
    const result = new Uint8Array(length)

    for (let i = 0; i < length; i++) {
      result[i] = this.readByte()
    }

    return result
  }

  /** Reads a single byte from the current file pointer as a signed integer. */
  public peekByte() {
    return this.peekUint8()
  }

  /**
   * Reads a single 16-bit unsigned integer from the current file pointer and
   * increments the pointer.
   */
  public readUint16() {
    const v = this.peekUint16()
    this.pointer += 2
    return v
  }

  /** Reads a single 16-bit unsigned integer from the current file pointer. */
  public peekUint16() {
    return this.view.getUint16(this.pointer)
  }

  /**
   * Reads bytes from the current file pointer until encountering a '\n' (0x0a)
   * then returns the read byes as a string.
   */
  public readLine() {
    let char = ''
    let result = ''

    while (char !== '\n') {
      result += char
      char = String.fromCharCode(this.readUint8())
    }

    return result
  }
}
