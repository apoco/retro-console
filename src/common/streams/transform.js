import { never, scan } from 'kefir';

export default function transform(initialValue, ...transformers) {
  let transformerStream = never();

  for (let i = 0; i < transformers.length; i += 2) {
    const eventStream = transformers[i];
    const transform = transformers[i + 1];
    transformerStream = transformerStream.merge(eventStream.map(event => [event, transform]));
  }

  return transformerStream.scan((value, [event, transform]) => transform(value, event), initialValue);
}
