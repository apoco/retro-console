import { fromEvents } from 'kefir';

export default function keyPresses(window) {
  const keyPresses = fromEvents(window, 'keypress').map(e => String.fromCharCode(e.charCode));

  // Backspace & other special keys aren't getting included
  const keyDowns = fromEvents(window, 'keydown');
  const backspaces = keyDowns.filter(e => e.keyCode === 8).map(() => '\u0008');

  return keyPresses.merge(backspaces);
}
