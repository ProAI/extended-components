import React from 'react';
import { withState } from 'extended-components';
import useToggleState from './useToggleState';

const enhance = withState({
  welcome: useToggleState(),
});

function Component(props, { welcome }) {
  return (
    <div>
      {welcome.on && <p>Welcome!</p>}
      <p>
        <button onClick={() => welcome.setOn()}>Show welcome message</button>
        <button onClick={() => welcome.setOff()}>Hide welcome message</button>
        <button onClick={() => welcome.toggle()}>Toggle welcome message</button>
      </p>
    </div>
  );
}

export default enhance(Component);
