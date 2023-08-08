import React, { ReactElement, ReactNode } from 'react';

interface TableBodyProps {
  children: ReactNode;
}

const TableBody = ({ children }: TableBodyProps): ReactElement => (
  <tbody className="table-body">{children}</tbody>
);

export default React.memo(TableBody);
