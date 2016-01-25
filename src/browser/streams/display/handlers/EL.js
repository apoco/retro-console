import { assign } from 'lodash';

// Erase lines
export default function handleEL(state, { params: [mode = 0] = [] }) {
  const { chars = [], pos: { col, row } } = state;
  const rowChars = chars[row] || [];
  switch (mode) {
    case 0:
      return assign({}, state, {
        chars: assign([], chars, {
          [row]: rowChars.slice(0, col)
        })
      });
    case 1:
      return assign({}, state, {
        chars: assign([], chars, {
          [row]: new Array(col + 1).join(' ').concat(rowChars.slice(col + 1))
        })
      });
    case 2:
      return assign({}, state, {
        chars: assign([], chars, {
          [row]: []
        })
      });
    default:
      console.error(`Unexpected EL mode ${mode}`);
      return state;
  }
}
