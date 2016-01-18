import ptyExits from '../pty/exits';
import electronExits from '../electron/exits';

let exits = ptyExits;
if (process.platform !== 'darwin') {
  exits = exits.merge(electronExits);
}

export default exits;
