import frames from './streams/window/animationFrames';
import stdout from './streams/shell/stdout';
import resizes from './streams/window/resizes';

export default function start(canvas) {

  const window = canvas.ownerDocument.defaultView;

  resizes(window).onValue(({ width, height }) => {
    canvas.width = width;
    canvas.height = height;
  });

  const ctx = canvas.getContext('2d');
  frames(window).onValue(() => {

  });

  stdout.onValue(ch => {
    console.log('Got character', ch);
  });
}
