import getEnhancedComponent from './utils/getEnhancedComponent';
import getAdvancedState from './utils/getAdvancedState';
import getStateUpdate from './utils/getStateUpdate';

export default function getDerivedStateFromProps(fn) {
  return (BaseComponent) => {
    const EnhancedComponent = getEnhancedComponent(BaseComponent);

    function staticGetDerivedStateFromProps(nextProps, prevState) {
      if (!EnhancedComponent.stateDefinition) {
        console.error('Static getDerivedStateFromProps called, but no state defined.');
        return null;
      }

      const state = {};

      // get state mutators
      const stateMutators = {};
      Object.keys(EnhancedComponent.stateDefinition).forEach((key) => {
        // define setState
        const setState = (input) => {
          state[key] = getStateUpdate(input, prevState[key]);
        };

        // add to state mutators
        stateMutators[key] = EnhancedComponent.stateDefinition[key].mutators(setState);
      });

      // call function with state and state mutators
      fn(nextProps, getAdvancedState(prevState, stateMutators));

      // return null or mutated state
      return Object.keys(state).length === 0 ? null : state;
    }

    // static
    EnhancedComponent.getDerivedStateFromProps = staticGetDerivedStateFromProps;

    return EnhancedComponent;
  };
}
