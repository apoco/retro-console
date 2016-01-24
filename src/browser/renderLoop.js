import { combine } from 'kefir';
import { ipcRenderer as ipc } from 'electron';

import frames from './streams/window/animationFrames';
import windowResizes from './streams/window/resizes';

import fontSize from './streams/display/fontSize';
import pixels from './streams/display/pixels';
import bells from './streams/audio/bells';
import keyPresses from './streams/window/keyPresses';
import terminalResizes from './streams/display/resizes';

import stdin from './streams/stdin';

const bpp = 4;
const greenOffset = 1;
const opacityOffset = 3;

export default function start(canvas) {

  const window = canvas.ownerDocument.defaultView;

  windowResizes(window).onValue(size => {
    canvas.width = size.width;
    canvas.height = size.height;
  });

  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000';

  const greenPixel = ctx.createImageData(1, 1);
  greenPixel.data[greenOffset] = 0xff;
  greenPixel.data[opacityOffset] = 0xff;

  pixels
    .sampledBy(frames(window))
    .skipDuplicates()
    .onValue(pixels => {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      pixels.forEach(({ x, y }) => ctx.putImageData(greenPixel, x, y));
    });

  const bellAudio = document.querySelector('#audio-bel');
  bells.onValue(() => {
    bellAudio.play();
  });

  stdin.onValue(ch => {
    ipc.send('stdin', ch);
  });

  terminalResizes.onValue(size => {
    ipc.send('resizes', size);
  });

  // Force initial window resize
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 100);
}
