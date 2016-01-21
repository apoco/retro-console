import { defaultsDeep } from 'lodash';

export default function handleCR(state) {
  return defaultsDeep({
    pos: {
      col: 0
    }
  }, state);
}
