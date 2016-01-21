import { ipcRenderer as ipc } from 'electron';
import { stream } from 'kefir';
import initialState from './fsm/initial'

export default stream(emitter => {
  let stateHandler = initialState;

  ipc.on('stdout', (evt, ch) => {
    const charCode = ch.charCodeAt(0);
    stateHandler = stateHandler(charCode, emitter);
  });
});
