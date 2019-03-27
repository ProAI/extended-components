export default function useToggleState(initialOn) {
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
      set: value => {
        setState({ on: value });
      },
      reset: () => {
        setState({ on: initialOn !== undefined ? initialOn : false });
      },
    }),
  };
}
