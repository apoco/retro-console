import { scan } from 'kefir';
import { assign, defaults } from 'lodash';
import transform from '../../../common/streams/transform';
import output from '../tty/output';

import printable from './handlers/printable';
import CR from './handlers/CR';
import CUB from './handlers/CUB';
import CUF from './handlers/CUF';
import CUP from './handlers/CUP';
import ED from './handlers/ED';
import EL from './handlers/EL';
import LF from './handlers/LF';
import SGR from './handlers/SGR';

const initialState = {
  size: { rows: 25, cols: 80 },
  pos: { row: 0, col: 0 },
  chars: []
};

const handlers = { printable, CR, CUB, CUF, CUP, ED, EL, LF, SGR };

export default output.scan((state, e) => {
  const { type: code, params } = e;

  const handler = handlers[code];
  if (handler) {
    return handler(state, e);
  }

  console.error('Unsupported control code', code, params);
  return state;
}, initialState);
