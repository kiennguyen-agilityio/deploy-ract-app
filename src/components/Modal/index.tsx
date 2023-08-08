import React from 'react';
import './index.css';

export interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ModalProps> = ({ isOpen, onClose, title, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close-button" onClick={onClose} type="button">
            &times;
          </button>
        </div>
        <div className="modal-body text-danger">Are you sure delete this vocabulary?</div>
        <div className="modal-footer">
          <button className="modal-confirm-button" onClick={onConfirm} type="button">
            Confirm
          </button>
          <button className="modal-cancel-button" onClick={onCancel} type="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ConfirmModal);
