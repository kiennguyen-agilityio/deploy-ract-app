import React, { ReactElement } from 'react';
import './index.css';

interface ActionProps {
  onDelete: () => void;
}

const ActionTable = ({ onDelete }: ActionProps): ReactElement => (
  <button className="btn-delete" onClick={onDelete}>
    &times;
  </button>
);

export default React.memo(ActionTable);
