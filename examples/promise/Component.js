import React from 'react';
import { withState } from 'extended-components';
import usePromiseState from './usePromiseState';

const enhance = withState({
  promise: usePromiseState(),
});

function Component({ changeUsername }, { promise }) {
  return (
    <div>
      {promise.pending && <p>Please wait...</p>}
      {promise.error && <p>Error: {promise.error}</p>}
      <p>
        <button onClick={() => promise.bind(changeUsername('John'))}>
          Change username to John
        </button>
      </p>
    </div>
  );
}

export default enhance(Component);
