import { defaults } from 'lodash';

export default function handleRM(state, { params = [] }) {
  return defaults({
    modes: params.reduce((curr, idx) => curr & ~(1 << (idx - 1)), state.modes)
  }, state);
};
