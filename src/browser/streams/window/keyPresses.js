import { fromEvents } from 'kefir';

export default function keyPresses(window) {
  return fromEvents(window, 'keypress');
}
