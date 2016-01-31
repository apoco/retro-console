export default function handleDSR(state, e) {
  // This does not effect output
  console.warn('Ignored DSR', e);
  return state;
}