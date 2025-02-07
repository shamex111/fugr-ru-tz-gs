import { FC, PropsWithChildren } from 'react';

const Heading: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <h3 className="text-3xl font-700 text-white my-5">{children}</h3>;
};

export default Heading;
