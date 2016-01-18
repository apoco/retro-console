import { stream } from 'kefir';

export default function input(nodeStream) {
  return stream(emitter => {
    nodeStream
      .on('data', str => str.split('').forEach(ch => emitter.emit(ch)))
      .on('error', err => emitter.error(err))
      .on('end', () => emitter.end());
  });
}
