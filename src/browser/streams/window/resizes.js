import { constant, fromEvents } from 'kefir';

export default function resizes(window) {

  const body = window.document.body;

  return constant(getSize(body))
    .concat(fromEvents(window, 'resize'))
    .map(() => getSize(body));
};

function getSize(body) {
  return {
    width: body.clientWidth,
    height: body.clientHeight
  };
}