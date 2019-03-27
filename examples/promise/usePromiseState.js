export default function usePromiseState() {
  return {
    initial: {
      pending: false,
      error: null,
    },
    mutators: setState => ({
      bind: promise => {
        setState({
          pending: true,
          error: null,
        });

        promise
          .then(() => {
            setState({
              pending: false,
              error: null,
            });
          })
          .catch((error: string) => {
            setState({
              pending: false,
              error,
            });
          });
      },
    }),
  };
}
