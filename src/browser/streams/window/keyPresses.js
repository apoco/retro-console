import { fromEvents, merge } from 'kefir';

export default function keyPresses(window) {
  const keyPresses = fromEvents(window, 'keypress').map(e => String.fromCharCode(e.charCode));
  const keyDowns = fromEvents(window, 'keydown');

  // Backspace & other special keys aren't getting included
  const specialKeyCodes = new Set([8, 9]);
  const specialKeys = keyDowns
    .filter(e => specialKeyCodes.has(e.keyCode))
    .map(e => String.fromCharCode(e.keyCode));

  // CTRL sequences
  const etxs = keyDowns
    .filter(e => e.ctrlKey && e.keyCode === 0x43) // Ctrl+C
    .map(() => '\u0003');                         // ETX

  return merge([keyPresses, specialKeys, etxs]);
}
