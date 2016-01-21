import controlFunctions from '../../../../../common/constants/controlFunctions';
import initialHandler from './initial';
import c1ControlCode from './c1ControlCode';

export default function handleEscapeSequence(charCode, emitter) {

  if (charCode >= 0x40 && charCode < 0x60) {
    return c1ControlCode(charCode + 0x40, emitter);
  } else if (charCode >= 0x60 && charCode < 0x7f) {
    const code = controlFunctions[charCode];
    if (code) {
      emitter.emit({ type: code });
    } else {
      emitter.error(new Error(`Unexpected function selector ${charCode}`));
    }
  } else {
    emitter.error(new Error(`Unexpected character ${charCode}`));
  }

  return initialHandler;
}
