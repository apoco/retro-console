import c1Codes from '../../../../common/constants/c1ControlCodes';
import controlSequence from './controlSequence';
import initialState from './initial';

export default function c1ControlCodeHandler(charCode, emitter) {
  const c1Code = c1Codes[charCode];

  if (!c1Code) {
    emitter.error(new Error(`Invalid c1 code ${charCode}`));
  } else {
    switch (c1Code) {
      case 'CSI':
        return controlSequence.bind(null, {});
      case 'APC':
      case 'DCS':
      case 'OSC':
      case 'PM':
      case 'SOS':
        return controlString.bind(null, { type: c1Code });
      default:
        emitter.emit({type: c1Code});
    }
  }

  return initialState;
}
