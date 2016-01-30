import { stream } from 'kefir';

export default function animationFrames(window) {
  return stream(emitter => {
    function onFrame() {
      emitter.emit(Date.now());
      window.requestAnimationFrame(onFrame);
    }

    onFrame();
  });
}
