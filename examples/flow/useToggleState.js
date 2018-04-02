// @flow

// Hint: You can also declare the following types in a flow lib, so that ToggleState is available
// globally and you don't have to import the type over and over.

type ToggleValues = {
  on: boolean,
};

type ToggleMutators = {
  setOn: () => void,
  setOff: () => void,
  toggle: () => void,
  set: (value: boolean) => void,
  reset: () => void,
};

// Use global Extended$StateDefinition type of extended-components.
type ToggleStateDefinition = Extended$StateDefinition<ToggleValues, ToggleMutators>;

// Use global Extended$State type of extended-components.
export type ToggleState = Extended$State<ToggleValues, ToggleMutators>;

export default function useToggleState(initialOn?: boolean): ToggleStateDefinition {
  return {
    initial: {
      on: initialOn !== undefined ? initialOn : false,
    },
    mutators: setState => ({
      setOn: () => {
        setState({ on: true });
      },
      setOff: () => {
        setState({ on: false });
      },
      toggle: () => {
        setState(({ on }) => ({ on: !on }));
      },
      set: (value) => {
        setState({ on: value });
      },
      reset: () => {
        setState({ on: initialOn !== undefined ? initialOn : false });
      },
    }),
  };
}
