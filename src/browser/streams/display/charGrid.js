import { scan } from 'kefir';
import { assign, defaults } from 'lodash';
import transform from '../../../common/streams/transform';
import output from '../tty/output';

import printable from './handlers/printable';
import CUB from './handlers/CUB';
import EL from './handlers/EL';

const initialState = {
  size: { rows: 25, cols: 80 },
  pos: { row: 0, col: 0 },
  chars: []
};

const handlers = { printable, CUB, EL };

export default output.scan((state, e) => {
  const handler = handlers[e.type];
  if (handler) {
    const newState = handler(state, e);
    console.log('newState', newState);
    return newState;
  }

  console.error('Unsupported control code', e.type);
  return state;
}, initialState);
