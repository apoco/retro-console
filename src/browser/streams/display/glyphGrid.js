import charGrid from './charGrid';
import glyphs from './glyphs';

export default charGrid
  .map(cg => cg.chars)
  .skipDuplicates()
  .map((rows = []) => rows
    .map((row = []) => row
      .map((ch = ' ') => ch.charCodeAt(0))
      .map(code => {
        if (code === 0x20) { // Space is not in the gylph table where expected
          return glyphs[0];
        } else if (code in glyphs) {
          return glyphs[code];
        } else {
          return glyphs[0x20];  // Strangely, the unknown character glyph is in the index for ASCII space
        }
      })
    )
  );
