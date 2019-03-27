export default function defaultProps(values) {
  return BaseComponent => {
    // don't create class, because it is not necessary for default props
    const EnhancedComponent = BaseComponent;

    EnhancedComponent.defaultProps = values;

    return EnhancedComponent;
  };
}
