import React from 'react';
import './index.css';

const TableHeader = () => {
  return (
    <thead className="table-header">
      <tr>
        <th className="table-title" scope="col">
          No.
        </th>
        <th className="table-title" scope="col">
          English (native)
        </th>
        <th className="table-title" scope="col">
          Vietnamese
        </th>
        <th className="table-title" scope="col">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default React.memo(TableHeader);
