export default function useValueState(initialValue) {
  return {
    initial: {
      value: initialValue,
    },
    mutators: setState => ({
      set: (value) => {
        setState({ value });
      },
      reset: () => {
        setState({ value: initialValue });
      },
    }),
  };
}
