import { stream } from 'kefir';

export default function animationFrames(window) {
  return stream(emitter => {
    function onFrame() {
      emitter.emit();
      window.requestAnimationFrame(onFrame);
    }

    onFrame();
  });
}
