import frames from './streams/window/animationFrames';
import resizes from './streams/window/resizes';

export default function start(canvas) {

  const window = canvas.ownerDocument.defaultView;

  resizes(window).onValue(({ width, height }) => {
    canvas.width = width;
    canvas.height = height;
  });

  const gl = canvas.getContext('webgl');
  frames(window).onValue(() => {
    gl.clearColor(Math.random(), Math.random(), Math.random(), 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  });
}
