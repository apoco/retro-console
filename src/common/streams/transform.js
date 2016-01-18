import { never, scan } from 'kefir';

export default function transform(initialValue, ...transformers) {
  let transformerStream = never();

  // Fuck you babel; you don't work. Cannot use ...transformers
  for (let i = 1; i < arguments.length; i += 2) {
    const eventStream = arguments[i];
    const transform = arguments[i + 1];
    transformerStream = transformerStream.merge(eventStream.map(event => [event, transform]));
  }

  return transformerStream.scan((value, [event, transform]) => transform(value, event), initialValue);
}
