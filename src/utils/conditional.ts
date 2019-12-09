/**
 * Component that renders other components based on the provided logical condition.
 */
export default (If = (props: any) => {
  const condition = props.condition || false;
  const positive = props.then || null;
  const negative = props.else || null;

  return condition ? positive : negative;
});
