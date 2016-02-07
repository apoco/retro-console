import { combine } from 'kefir';
import fontSize from '../../../common/constants/fontSize';
import glyphGrid from './glyphGrid';
import resizes from './resizes';

export default function bitmap(ctx) {
  return combine([glyphGrid, resizes])
    .throttle(16)
    .map(([glyphRows, { cols, rows }]) => {
      const width = cols * fontSize.width;
      const height = rows * fontSize.height;
      const imageData = ctx.createImageData(width, height);
      const buffer = new ArrayBuffer(width * height * 4);
      const byteBuffer = new Uint8ClampedArray(buffer);
      const dwordBuffer = new Uint32Array(buffer);

      glyphRows.forEach((glyphs, row) => {
        const glyphY = row * fontSize.height;
        glyphs.forEach((scanLines, col) => {
          const glyphX = col * fontSize.width;
          scanLines.forEach((bits, line) => {
            const y = glyphY + line * 2;
            for (let i = 0; bits; bits >>=1, i++) {
              if (bits & 1) {
                const x = glyphX + i;
                dwordBuffer[x + y * width] = 0xff00ff00;
              }
            }
          });
        });
      });

      imageData.data.set(byteBuffer);
      return imageData;
    });
}
