import React from 'react';
import { withState } from 'extended-components';
import useCounterState from './useCounterState';

const enhance = withState({
  counter: useCounterState(),
});

function Component(props, { counter }) {
  return (
    <div>
      <p>Count: {counter.count}</p>
      <p>
        <button onClick={() => counter.increment()}>Increment</button>
        <button onClick={() => counter.decrement()}>Decrement</button>
        <button onClick={() => counter.incrementBy(5)}>Increment by 5</button>
        <button onClick={() => counter.decrementBy(5)}>Decrement by 5</button>
        <button onClick={() => counter.reset()}>Reset</button>
        <button onClick={() => counter.set(5)}>Set to 5</button>
      </p>
    </div>
  );
}

export default enhance(Component);
