import { ipcRenderer as ipc } from 'electron';
import { stream } from 'kefir';

export default function input(channel) {
  return stream(emitter => {
    ipc.on(channel, (evt, ch) => emitter.emit(ch));
  });
}
