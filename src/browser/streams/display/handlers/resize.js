import { defaultsDeep } from 'lodash';

export default function resizeHandler(state, size) {
  return defaultsDeep({ size }, state);
}
