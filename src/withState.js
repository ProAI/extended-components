import getEnhancedComponent from './utils/getEnhancedComponent';
import getStateUpdate from './utils/getStateUpdate';

export default function withState(definition) {
  return BaseComponent => {
    const EnhancedComponent = getEnhancedComponent(BaseComponent);

    function prepareState() {
      const initialState = {};
      const stateMutators = {};

      Object.keys(definition).forEach(key => {
        const setState = input => {
          this.setState(prevState => ({
            [key]: getStateUpdate(input, prevState[key]),
          }));
        };

        initialState[key] = definition[key].initial;
        stateMutators[key] = definition[key].mutators(setState);
      });

      this.state = initialState;
      this.stateMutators = stateMutators;
    }

    // static
    EnhancedComponent.stateDefinition = definition;

    // prototype
    EnhancedComponent.prototype.prepareState = prepareState;

    return EnhancedComponent;
  };
}
