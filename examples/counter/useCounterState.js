export default function useCounterState(initialCount) {
  return {
    initial: {
      count: initialCount !== undefined ? initialCount : 0,
    },
    mutators: setState => ({
      increment: () => {
        setState(({ count }) => ({ count: count + 1 }));
      },
      decrement: () => {
        setState(({ count }) => ({ count: count - 1 }));
      },
      incrementBy: value => {
        setState(({ count }) => ({ count: count + value }));
      },
      decrementBy: value => {
        setState(({ count }) => ({ count: count - value }));
      },
      set: value => {
        setState({ count: value });
      },
      reset: () => {
        setState({ count: initialCount !== undefined ? initialCount : 0 });
      },
    }),
  };
}
