# React Envelope

Extend functional React.js components with default props, advanced local state (presets for common use cases like toggle, counter, ...) and lifecycle hooks.

_This package is not meant as a replacement for state management libraries like [Redux](https://github.com/reactjs/redux), it should be used for local state only (i.e. state that is used by not really more than one component)._

## Problem

There are two problems that motivated me to create this package:

1.  Functional components don't support local state and lifecycle hooks.
2.  There were no presets for common local state use cases (toggles, counters, ...).

## Solution

This package consists of some higher order components (HOC), which let you define default props, state and lifecycle methods for a functional component. Also you can define state presets like `useCounterState` or `useToggleState` that can be used with the `withState` HOC perfectly. If you define state, `extended-components` will pass a second argument to your functional component ([as described by Andrew Clark](https://twitter.com/acdlite/status/971598256454098944)).

This package uses HOCs and not render props. Don't get me wrong, I use render props a lot, but I think in this case HOCs have slightly advantages like a good separation of concerns and [clean code](https://twitter.com/acdlite/status/971605795501613056).

Technically `extended-components` makes use of [component squashing](https://twitter.com/acdlite/status/739918904110112770), so the original functional component will be squashed by the HOCs to improve performance.

## Installation

```shell
npm install extended-components
# or
yarn add extended-components
```

## Usage

```jsx
import React from 'react';
import { compose, withState, lifecycle, pure } from 'extended-components';
import useCounterState from './useCounterState';

const enhance = compose(
  // Use state helpers to define state
  withState({
    counter: useCounterState(),
  }),
  // Use React.js lifecycle hooks with props and state
  lifecycle((props, { counter }) => {
    componentDidUpdate() {
      counter.increment();
    },
  }),
  // Component is a pure component
  pure(),
});

// Use defined state
function Component(props, state) {
  const { counter } = state;

  return (
    <div>
      <p>This component was updated {counter.count} times.</p>
      <p>
        <button onClick={() => { counter.reset() }}>Reset counter</button>
      </p>
    </div>
  );
}

export default enhance(Component);
```

Hint: You can use the HOCs of `extended-components` in conjunction with other higher order components, but thus these higher order components don't expect a functional component with two arguments, HOCs of `extended-components` should always be placed last, e.g.:

```javascript
const enhance = compose(
  withRouter(...),
  connect(...),
  graphql(...),
  mapProps(...),
  // Use extended-components HOCs last
  withState(...),
);
```

### Create state helpers

The purpose of this package is to enable a convient way to define state for specific use cases, but not to implement all these use cases. So it is up to you to define state helpers. A state helper is simply an object with the keys `initial` (for initial state) and `mutators` (for state mutator functions):

```javascript
function useCounterState() {
  return {
    initial: {
      count: 0
    },
    mutators: setState => ({
      increment: () => {
        setState(({ count }) => ({ count: count + 1 }));
      },
      decrement: () => {
        setState(({ count }) => ({ count: count - 1 }));
      },
      reset: () => {
        setState({ count: 0 });
      }
    })
  };
}
```

Then you can reuse this state helper over and over like shown in the example above. For more examples have a look at the [`examples`](https://github.com/ProAI/extended-components/tree/master/examples) folder.

## Docs

### `defaultProps`

Defines the default props of a component.

```typescript
type DefaultProps = ((defaultProps: $Shape<Props>) => void) => HOC
```

### `getDerivedStateFromProps`

Defines the static lifecycle hook `getDerivedStateFromProps` (introduced in React 16.3). Notice that this hook returns void (in comparison to the original hook, which returns a state object), because you can update the state via the state mutators.

```typescript
type GetDerivedStateFromProps = ((nextProps: Props, prevState?: State) => void) => HOC
```

### `lifecycle`

Defines lifecycle hooks.

```typescript
type Lifecycle = (
    (
      props: Props,
      state?: State,
    ) => {
      componentDidMount?: () => void,
      shouldComponentUpdate?: (nextProps: Props, nextState?: State) => boolean,
      componentDidUpdate?: (prevProps: Props, prevState?: State) => void,
      componentWillUnmount?: () => void,
    },
  ) => HOC;
```

### `pure`

Equivalent to `React.PureComponent`, but instead of a basic shallow state comparison this function makes a shallow comparison for the state of every state helper.

```typescript
type Pure = () => HOC;
```

### `withState`

Defines state with state helpers.

```typescript
type WithState = ({
    [string]: StateHelper<SubStateValues, SubStateMutators, Props>,
  }) => HOC;
```

### `statics`

Defines static properties of a component.

```typescript
type Statics = Object => HOC;
```

### State helpers

As stated above you can define your own state helpers that should be of the following type:

```typescript
type SetState<SubStateValues, Props> = (
  $Shape<SubStateValues> | ((SubStateValues, Props) => $Shape<SubStateValues>),
) => void;

type StateHelper<SubStateValues, SubStateMutators, Props> = {
  initial: SubStateValues,
  mutators: (SetState<SubStateValues, Props>) => SubStateMutators,
};
```

_The definitions above might differ from the real Flow definitions, because the definitions in this section should just demonstrate what you can do with this package._

## Flow support

For more information about the usage with Flow see [Flow support](docs/Flow%20support.md).

## Inspiration

This package is heavily inspired by Andrew Clark's great library [`recompose`](https://github.com/acdlite/recompose). And I think you can perfectly use `recompose` and `extended-components` together, because `extended-components` just mimics all class features and `recompose` offers a lot more utils. You can use `extended-components` for state and lifecycle hooks and `recompose` for props manipulation and more.

## Future

Currently there are only two arguments that are passed to a functional component, but you can think of more arguments. So it might be that someday this package will offer an api for higher order components like `withTheme`, `withIntl`, `withRouter` and so on, which add more arguments to the component. Each argument for a specific use case.

## License

This package is released under the [MIT License](LICENSE).
