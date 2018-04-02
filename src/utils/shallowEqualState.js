import shallowEqual from 'fbjs/lib/shallowEqual';

export default function shallowEqualState(state, nextState) {
  if (!state) {
    return true;
  }

  return Object.keys(state).every(key => shallowEqual(state[key], nextState[key]));
}
