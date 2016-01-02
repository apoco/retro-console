import ipc from 'ipc';
import { fromEvents } from 'kefir';

export default fromEvents(ipc, 'input');