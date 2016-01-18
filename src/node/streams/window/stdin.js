import { stream } from 'kefir';
import { ipcMain as ipc } from 'electron';

export default stream(emitter => {
  ipc.on('stdin', (e, ch) => emitter.emit(ch));
});
