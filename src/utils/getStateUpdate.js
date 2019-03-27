export default function getStateUpdate(input, prevStateFragment) {
  const nextStateFragment =
    typeof input === 'function' ? input(prevStateFragment) : input;

  return {
    ...prevStateFragment,
    ...nextStateFragment,
  };
}
