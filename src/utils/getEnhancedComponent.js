import createClass from './createClass';

export default function getEnhancedComponent(BaseComponent) {
  return BaseComponent.isEnvelopedComponent ? BaseComponent : createClass(BaseComponent);
}
