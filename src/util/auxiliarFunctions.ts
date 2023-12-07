/**
 * Converts a JS string to a UTF-8 "byte" array.
 * @param {string} str 16-bit unicode string.
 * @return {!Array<number>} UTF-8 byte array.
 */
export function stringToUtf8ByteArray(str: string): Array<number> {
    // TODO(user): Use native implementations if/when available
    var out = [], p = 0;
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      if (c < 128) {
        out[p++] = c;
      } else if (c < 2048) {
        out[p++] = (c >> 6) | 192;
        out[p++] = (c & 63) | 128;
      } else if (
          ((c & 0xFC00) == 0xD800) && (i + 1) < str.length &&
          ((str.charCodeAt(i + 1) & 0xFC00) == 0xDC00)) {
        // Surrogate Pair
        c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
        out[p++] = (c >> 18) | 240;
        out[p++] = ((c >> 12) & 63) | 128;
        out[p++] = ((c >> 6) & 63) | 128;
        out[p++] = (c & 63) | 128;
      } else {
        out[p++] = (c >> 12) | 224;
        out[p++] = ((c >> 6) & 63) | 128;
        out[p++] = (c & 63) | 128;
      }
    }
    return out;
  };
  
  
  /**
   * Converts a UTF-8 byte array to JavaScript's 16-bit Unicode.
   * @param {Uint8Array|Array<number>} bytes UTF-8 byte array.
   * @return {string} 16-bit Unicode string.
   */
export function utf8ByteArrayToString(bytes: Uint8Array): string {
    // TODO(user): Use native implementations if/when available
    var out = [], pos = 0, c = 0;
    while (pos < bytes.length) {
      var c1 = bytes[pos++];
      if (c1 < 128) {
        out[c++] = String.fromCharCode(c1);
      } else if (c1 > 191 && c1 < 224) {
        var c2 = bytes[pos++];
        out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
      } else if (c1 > 239 && c1 < 365) {
        // Surrogate Pair
        var c2 = bytes[pos++];
        var c3 = bytes[pos++];
        var c4 = bytes[pos++];
        var u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) -
            0x10000;
        out[c++] = String.fromCharCode(0xD800 + (u >> 10));
        out[c++] = String.fromCharCode(0xDC00 + (u & 1023));
      } else {
        var c2 = bytes[pos++];
        var c3 = bytes[pos++];
        out[c++] =
            String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
      }
    }
    return out.join('');
  };

  export function intTo3CharString(int: number){
      if(int < 10){
          return "00"+int
      }
      if(int < 100){
          return "0"+int
      }
      if(int >= 1000){
        return "999"
      }
      return ""+int
  }