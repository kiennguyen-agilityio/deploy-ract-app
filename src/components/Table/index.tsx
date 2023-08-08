import React, { ReactElement, ReactNode } from 'react';

// Styles
import './index.css';

interface TableProps {
  children: ReactNode;
}

const Table = ({ children }: TableProps): ReactElement => (
  <table className="table table-striped">{children}</table>
);

export default React.memo(Table);
