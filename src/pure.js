import getEnhancedComponent from './utils/getEnhancedComponent';
import shallowEqualProps from './utils/shallowEqualProps';
import shallowEqualState from './utils/shallowEqualState';

export default function pure() {
  return (BaseComponent) => {
    const EnhancedComponent = getEnhancedComponent(BaseComponent);

    function shouldComponentUpdate(nextProps, nextState) {
      // props or states are not equal -> update
      if (!shallowEqualProps(this.props, nextProps) || !shallowEqualState(this.state, nextState)) {
        return true;
      }

      // props and states are equal -> don't update
      return false;
    }

    // prototype
    EnhancedComponent.prototype.shouldComponentUpdate = shouldComponentUpdate;

    return EnhancedComponent;
  };
}
