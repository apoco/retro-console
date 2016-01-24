import { filter, flatMap, map, range } from 'lodash';
import glyphGrid from './glyphGrid';
import fontSize from './fontSize';

export default glyphGrid
  .throttle(16)
  .skipDuplicates()
  .map(grid => flatMap(grid, (row = [], rowIdx) =>
    flatMap(row, (char = [], colIdx) =>
      flatMap(char, (scanLine = 0, scanLineIdx) =>
        flatMap(
          map(filter(range(fontSize.width), i => (scanLine >> i) & 1), i => ({
            x: colIdx * fontSize.width + i,
            y: rowIdx * fontSize.height + scanLineIdx * 2
          }))
        )
      )
    )
  ));
