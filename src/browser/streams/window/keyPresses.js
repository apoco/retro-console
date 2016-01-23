import { fromEvents, merge } from 'kefir';

export default function keyPresses(window) {
  const keyPresses = fromEvents(window, 'keypress').map(e => String.fromCharCode(e.charCode));
  const keyDowns = fromEvents(window, 'keydown');

  // Backspace & other special keys aren't getting included
  const specialKeyCodes = new Set([0x8, 0x9, 0x1b]);
  const specialKeys = keyDowns
    .filter(e => specialKeyCodes.has(e.keyCode))
    .map(e => String.fromCharCode(e.keyCode));

  // CTRL sequences
  const leftKeys = keyDowns.filter(e => e.keyCode === 37).map(() => '\u001b[D');
  const upKeys = keyDowns.filter(e => e.keyCode === 38).map(() => '\u001b[A');
  const rightKeys = keyDowns.filter(e => e.keyCode === 39).map(() => '\u001b[C');
  const downKeys = keyDowns.filter(e => e.keyCode === 40).map(() => '\u001b[B');
  const etxs = keyDowns
    .filter(e => e.ctrlKey && e.keyCode === 0x43) // Ctrl+C
    .map(() => '\u0003');                         // ETX

  return merge([keyPresses, specialKeys, upKeys, downKeys, leftKeys, rightKeys, etxs]);
}
