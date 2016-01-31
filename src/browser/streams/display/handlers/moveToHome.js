import { defaultsDeep } from 'lodash';

export default function moveToHome(state) {
  return defaultsDeep({
    pos: {
      col: 0
    }
  }, state);
}
