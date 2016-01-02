import { stream } from 'kefir';

export default stream(emitter => {
  const { stdin } = process;

  if (stdin.setRawMode) {
    stdin.setRawMode(true);
  }

  stdin.setEncoding('utf8');
  stdin
    .on('data', str => str.split('').forEach(ch => emitter.emit(ch)))
    .on('error', err => emitter.error(err))
    .on('end', () => emitter.end())
    .resume();
});
