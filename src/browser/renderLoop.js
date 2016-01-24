import { combine } from 'kefir';
import { ipcRenderer as ipc } from 'electron';

import frames from './streams/window/animationFrames';
import windowResizes from './streams/window/resizes';

import fontSize from './streams/display/fontSize';
import pixels from './streams/display/glyphPixels';
import bells from './streams/audio/bells';
import keyPresses from './streams/window/keyPresses';
import terminalResizes from './streams/display/resizes';
import cursor from './streams/display/cursor';

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

  const blinkRate = 1000;

  const ctx = canvas.getContext('2d');

  const greenPixel = ctx.createImageData(1, 1);
  greenPixel.data[greenOffset] = 0xff;
  greenPixel.data[opacityOffset] = 0xff;

  combine([frames(window)], [pixels, cursor]).onValue(([frame, pixels = [], { row = 0, col = 0 } = {}]) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff00';
    pixels.forEach(({ x, y }) => {
      ctx.fillRect(x, y, 1, 1);
    });

    if (Math.floor(Date.now() / blinkRate) % 2) {
      const cursorX = col * fontSize.width;
      const cursorY = row * fontSize.height;
      for (let y = 0; y < fontSize.height; y += 2) {
        ctx.fillRect(cursorX, cursorY + y, fontSize.width, 1);
      }
    }
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
