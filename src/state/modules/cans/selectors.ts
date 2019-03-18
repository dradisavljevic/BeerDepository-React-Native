import { CanState } from './types';

const getCanState = ({ can }: { can: CanState }) => {
  return {
    ...can
  };
};

export { getCanState };
