import pty from './';
import input from '../io/input';

export default pty.flatMap(pty => input(pty));
