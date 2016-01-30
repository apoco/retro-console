import stdout from '../stdout';

export default stdout.filter(({ type }) => type === 'BEL');
