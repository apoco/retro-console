import { assign } from 'lodash';

export default function handleEL(state, { params: [mode] }) {
  const { chars = [], pos: { col, row } } = state;
  const rowChars = chars[row] || [];
  switch (mode || 0) {
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
