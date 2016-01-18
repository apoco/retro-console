import { combine } from 'kefir';
import frames from './streams/window/animationFrames';
import stdout from './streams/shell/stdout';
import resizes from './streams/window/resizes';
import charGrid from './streams/display/charGrid';

export default function start(canvas) {

  const window = canvas.ownerDocument.defaultView;

  const ctx = canvas.getContext('2d');
  resizes(window).onValue(({ width, height }) => {
    canvas.width = width;
    canvas.height = height;
  });

  ctx.font = '20px monospace';
  ctx.textBaseline = 'top';

  combine([frames(window)], [charGrid]).onValue(([, { chars: grid }]) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const text = grid.map(row => row.join('')).join('\n');
    ctx.fillStyle = '#0f0';
    ctx.fillText(text, 0, 0);
  });
}
