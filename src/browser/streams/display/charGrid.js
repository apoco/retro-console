import { scan } from 'kefir';
import { assign, defaults } from 'lodash';
import transform from '../../../common/streams/transform';
import output from '../tty/output';
import handlers from './handlers';

const initialState = {
  size: { rows: 25, cols: 80 },
  pos: { row: 0, col: 0 },
  chars: []
};

export default output.scan((state, e) => {
  const { type: code, params } = e;

  const handler = handlers[code];
  if (handler) {
    return handler(state, e);
  }

  console.error('Unsupported control code', code, params);
  return state;
}, initialState);
