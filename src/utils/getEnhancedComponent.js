import createClass from './createClass';

export default function getEnhancedComponent(BaseComponent) {
  return BaseComponent.isExtendedComponent
    ? BaseComponent
    : createClass(BaseComponent);
}
