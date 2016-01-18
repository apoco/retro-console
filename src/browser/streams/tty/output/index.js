import { ipcRenderer as ipc } from 'electron';
import { stream } from 'kefir';

export default stream(emitter => {
  ipc.on('stdout', (evt, ch) => emitter.emit(ch));
});
