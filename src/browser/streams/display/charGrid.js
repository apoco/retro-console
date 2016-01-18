import transform from '../../../common/streams/transform';
import printables from '../tty/output/printables';

const initialState = {
  size: { rows: 25, cols: 80 },
  pos: { row: 0, col: 0 },
  chars: []
};

export default transform(initialState,
  printables, (state, character) => {
    const { pos, size: { rows, cols }, chars } = state;
    let { row, col } = pos;

    const newChars = Object.assign([], chars, {
      [row]: Object.assign([], chars[row] || [], { [col]: character })
    });

    col++;
    while (col >= cols) {
      row++;
      col = 0;
    }

    const scrollLines = Math.max(0, row - rows + 1);

    const newState = {
      size: {
        rows,
        cols
      },
      pos: {
        row: Math.min(row, rows - 1),
        col: col % cols
      },
      chars: newChars.slice(scrollLines)
    };

    console.log('Got', character, character.charCodeAt(0), 'new state', newState);

    return newState;
  }
);
