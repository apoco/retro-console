import { defaultsDeep } from 'lodash';

// Move to the first column
export default function handleCR(state) {
  return defaultsDeep({
    pos: {
      col: 0
    }
  }, state);
}
