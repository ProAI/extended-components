export default function getAdvancedState(state, stateMutators) {
  if (!state || !stateMutators) return undefined;

  const advancedState = {};

  Object.keys(state).forEach(key => {
    advancedState[key] = {
      ...state[key],
      ...stateMutators[key],
    };
  });

  return advancedState;
}
