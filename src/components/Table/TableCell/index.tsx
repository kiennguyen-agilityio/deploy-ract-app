import React, { ReactElement, ReactNode } from 'react';

export interface CellProps {
  value?: string | number;
  children?: ReactNode;
}

const TableCell = ({ value = '', children }: CellProps): ReactElement => (
  <td>
    {value}
    {children}
  </td>
);

export default React.memo(TableCell);
