import React, { ReactElement, ReactNode } from 'react';

interface TableRowProps {
  classTableRow?: 'header' | 'message' | 'spinner';
  children: ReactNode;
}

const TableRow = ({ children, classTableRow }: TableRowProps): ReactElement => (
  <tr className={`table-row ${classTableRow ? `table-row-${classTableRow}` : ''}`}>{children}</tr>
);

export default React.memo(TableRow);
