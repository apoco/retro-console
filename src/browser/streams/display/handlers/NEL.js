import moveDown from './moveDown';
import moveToHome from './moveToHome';

export default function handleNEL(state) {
  return moveDown(moveToHome(state));
}
