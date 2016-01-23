import windowResizes from '../window/resizes';

const fontSize = { width: 12, height: 20 };

export default windowResizes(window).map(({ width, height }) => {
  return {
    type: 'resize',
    rows: Math.floor(height / fontSize.height),
    cols: Math.floor(width / fontSize.width)
  }
});
