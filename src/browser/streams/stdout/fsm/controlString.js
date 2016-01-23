import initialState from './initial';

export default function controlStringHandler({ type, bytes = [] }, charCode, emitter) {
  if (charCode === 0x9c) /* ST */ {
    emitter.emit({ type, bytes });
    return initialState;
  } else {
    return controlStringHandler.bind({ type, bytes: bytes.concat([charCode]) });
  }
}
