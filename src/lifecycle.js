import getEnhancedComponent from './utils/getEnhancedComponent';
import getAdvancedState from './utils/getAdvancedState';

export default function lifecycle(defineLifecycleHooks) {
  return (BaseComponent) => {
    const EnhancedComponent = getEnhancedComponent(BaseComponent);

    function prepareLifecycle() {
      // define lifecycle hooks
      const hooks = defineLifecycleHooks(
        this.props,
        getAdvancedState(this.state, this.stateMutators),
      );

      // componentDidMount hook
      if (hooks.componentDidMount) {
        this.componentDidMount = hooks.componentDidMount;
      }

      // shouldComponentUpdate hook
      if (hooks.shouldComponentUpdate) {
        this.shouldComponentUpdate = (nextProps, nextState) =>
          hooks.shouldComponentUpdate(nextProps, getAdvancedState(nextState, this.stateMutators));
      }

      // componentDidUpdate hook
      if (hooks.componentDidUpdate) {
        this.componentDidUpdate = (prevProps, prevState) => {
          hooks.componentDidUpdate(prevProps, getAdvancedState(prevState, this.stateMutators));
        };
      }

      // componentWillUnmount hook
      if (hooks.componentWillUnmount) {
        this.componentWillUnmount = hooks.componentWillUnmount;
      }
    }

    // prototype
    EnhancedComponent.prototype.prepareLifecycle = prepareLifecycle;

    return EnhancedComponent;
  };
}
