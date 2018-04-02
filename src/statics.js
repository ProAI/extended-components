export default function statics(values) {
  return (BaseComponent) => {
    // don't create class, because it is not necessary for statics
    const EnhancedComponent = BaseComponent;

    Object.keys(values).forEach((key) => {
      EnhancedComponent[key] = values[key];
    });

    return EnhancedComponent;
  };
}
