import { combine } from 'kefir';
import { ipcRenderer as ipc } from 'electron';
import frames from './streams/window/animationFrames';
import resizes from './streams/window/resizes';
import charGrid from './streams/display/charGrid';
import keyPresses from './streams/window/keyPresses';
import output from './streams/tty/output';
import bells from './streams/audio/bells';

export default function start(canvas) {

  const window = canvas.ownerDocument.defaultView;

  const ctx = canvas.getContext('2d');
  resizes(window).onValue(({ width, height }) => {
    canvas.width = width;
    canvas.height = height;
  });

  combine([frames(window)], [charGrid]).onValue(([, { chars: grid }]) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    ctx.font = '20px monospace';
    ctx.textBaseline = 'top';
    grid.forEach((row = [], idx) => {
      ctx.fillText(row.map(ch => ch || ' ').join(''), 0, idx * 20);
    });
  });

  const bellAudio = document.querySelector('#audio-bel');
  bells.onValue(() => {
    bellAudio.play();
  });

  keyPresses(window).onValue(ch => {
    ipc.send('stdin', ch);
  });

  output.onError(err => {
    console.error(err.stack);
  });
}
