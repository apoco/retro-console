import { constant, fromEvents } from 'kefir';

function getSize(body) {
  return {
    width: body.clientWidth,
    height: body.clientHeight
  };
}

export default function resizes(window) {
  const body = window.document.body;
  return fromEvents(window, 'resize').map(() => {
    console.log('Got window resize?');
    return getSize(body)
  });
};
