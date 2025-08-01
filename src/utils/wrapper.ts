export const wrapper = <P extends object>(
  hocs: Array<(component: React.ComponentType<P>) => React.ComponentType<P>>,
  Component: React.ComponentType<P>,
): React.ComponentType<P> => {
  return hocs.reduceRight((acc, hoc) => hoc(acc), Component);
};
