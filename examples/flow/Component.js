// @flow
import React from 'react';
import { withState } from 'extended-components';
import useToggleState from './useToggleState';
import type { ToggleState } from './useToggleState';

type Props = {};

type State = {
  welcome: ToggleState,
};

const enhance = withState({
  welcome: useToggleState(),
});

function Component(props: Props, { welcome }: State) {
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
