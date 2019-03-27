import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import getDisplayName from './getDisplayName';
import getAdvancedState from './getAdvancedState';

export default function createClass(BaseComponent) {
  class ExtendedComponent extends React.Component {
    constructor(props) {
      super(props);

      // prepare (initial) state
      if (this.prepareState) {
        this.prepareState();
      }

      // prepare lifecycle hooks
      if (this.prepareLifecycle) {
        this.prepareLifecycle();
      }
    }

    render() {
      // render with state
      if (ExtendedComponent.stateDefinition) {
        return BaseComponent(
          this.props,
          getAdvancedState(this.state, this.stateMutators),
        );
      }

      // render without state
      return BaseComponent(this.props);
    }
  }

  // static
  ExtendedComponent.isExtendedComponent = true;
  ExtendedComponent.displayName = `Extended(${getDisplayName(BaseComponent)})`;
  if (BaseComponent.defaultProps) {
    ExtendedComponent.defaultProps = BaseComponent.defaultProps;
  }

  // copy non react static methods
  hoistNonReactStatic(ExtendedComponent, BaseComponent);

  return ExtendedComponent;
}
