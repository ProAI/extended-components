import React from 'react';
import { withState } from 'extended-components';
import useValueState from './useValueState';

const enhance = withState({
  input: useValueState(),
});

function Component(props, { input }) {
  return (
    <div>
      Name:
      <input type="text" value={input.value} onChange={event => input.set(event.target.value)} />
    </div>
  );
}

export default enhance(Component);
