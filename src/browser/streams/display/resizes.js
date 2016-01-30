import windowResizes from '../window/resizes';
import fontSize from './../../../common/constants/fontSize';

export default windowResizes(window).map(({ width, height }) => {
  return {
    type: 'resize',
    rows: Math.floor(height / fontSize.height),
    cols: Math.floor(width / fontSize.width)
  }
});
