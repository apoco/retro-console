import { constant, fromEvents } from 'kefir';

export default function resizes(window) {

  const body = window.document.body;

  return constant(null)
    .concat(fromEvents(window, 'resize'))
    .map(() => {
      return {
        width: body.clientWidth,
        height: body.clientHeight
      }
    });
};
