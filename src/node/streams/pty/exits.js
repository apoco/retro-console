import { fromEvents } from 'kefir';
import pty from './';

export default pty.flatMap(pty => fromEvents(pty, 'exit'));
