import initialState from './initial';
import controlSequences from '../../../../../common/constants/controlSequences';

export default function controlSequenceHandler(state = {}, charCode, emitter) {
  const { params = [], bytes = [] } = state;

  if (charCode >= 0x30 && charCode < 0x40) {
    return controlSequenceHandler.bind(null, { params: params.concat([charCode & 0xf ]), bytes });
  } else if (charCode >= 0x20 && charCode < 0x30) {
    return controlSequenceHandler.bind(null, { params, bytes: bytes.concat([charCode]) });
  } else if (charCode >= 0x40 && charCode < 0x7f) {
    const code = bytes
      .concat([charCode])
      .reduce((choices, byte) => (choices && byte in choices) ? choices[byte] : null, controlSequences);
    if (code && typeof(code) === 'string') {
      emitter.emit({
        type: code,
        params: params
          .map(ch => String.fromCharCode(ch))
          .join('')
          .split(';')
          .map(str => str.replace(':', '.'))
          .map(str => str ? parseFloat(str) : null)
      });
      return initialState;
    }
  }

  emitter.error(new Error(`Unexpected character ${charCode}`));
  return initialState;
}
