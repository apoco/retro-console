import escapeSequence from './escapeSequence';
import controlSequence from './controlSequence';
import c1ControlCode from './c1ControlCode';
import c0ControlCodes from '../../../../common/constants/c0ControlCodes';

export default function handleInitialState(charCode, emitter) {
  if ((charCode >= 0x20 && charCode < 0x7f) || charCode >= 0xa0) {
    emitter.emit({ type: 'printable', character: String.fromCharCode(charCode) });
    return handleInitialState;
  } else if (charCode < 0x20) {
    const controlCode = c0ControlCodes[charCode];
    if (controlCode === 'ESC') {
      return escapeSequence;
    } else {
      emitter.emit({ type: controlCode })
    }
  } else if (charCode >= 0x80) {
    return c1ControlCode(charCode, emitter);
  } else {
    emitter.error(new Error(`Unexpected character ${charCode}`));
  }

  return handleInitialState;
}
