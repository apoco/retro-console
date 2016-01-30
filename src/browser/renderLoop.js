import { combine } from 'kefir';
import { ipcRenderer as ipc } from 'electron';

import frames from './streams/window/animationFrames';
import windowResizes from './streams/window/resizes';

import fontSize from './../common/constants/fontSize';
import glyphGrid from './streams/display/glyphGrid';
import bells from './streams/audio/bells';
import keyPresses from './streams/window/keyPresses';
import terminalResizes from './streams/display/resizes';
import cursor from './streams/display/cursor';

import stdin from './streams/stdin';

const bpp = 4;
const greenOffset = 1;
const opacityOffset = 3;
const blinkRate = 500;

export default function start(canvas) {

  const window = canvas.ownerDocument.defaultView;

  windowResizes(window).onValue(size => {
    canvas.width = size.width;
    canvas.height = size.height;
  });

  combine([frames(window)], [glyphGrid, cursor]).onValue(([frame, glyphRows, { row, col }]) => {
    const ctx = canvas.getContext('2d');

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    glyphRows.forEach((glyphs, row) => {
      const glyphY = row * fontSize.height;
      glyphs.forEach((scanLines, col) => {
        const glyphX = col * fontSize.width;
        scanLines.forEach((bits, line) => {
          const y = glyphY + line * 2;
          for (let i = 0; i < fontSize.width; i++) {
            if (bits >> i & 1) {
              const x = glyphX + i;
              const pixelOffset = bpp * (x + y * canvas.width);
              imageData.data[pixelOffset + greenOffset] = 0xff;
              imageData.data[pixelOffset + opacityOffset] = 0xff;
            }
          }
        });
      });
    });
    ctx.putImageData(imageData, 0, 0);

    if (Math.floor(Date.now() / blinkRate) % 2) {
      ctx.fillStyle = '#00ff00';
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
