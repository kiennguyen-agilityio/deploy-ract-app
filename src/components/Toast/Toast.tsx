import  { MouseEvent } from 'react';

// style
import './index.css';

interface Props {
  status: string;
  message: string;
  onClose: () => void;
}

const Toast: React.FC<Props> = ({ status, message, onClose }) => {
  const handleCloseToast = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className={`toast ${status === 'success' ? 'success' : 'error'}`}>
      <div className="notification">
        {status === 'success' && <span className="material-symbols-outlined">done</span>}
        {status === 'error' && <span className="material-symbols-outlined">warning</span>}
        <div className="message">
          <p className="content">{message}</p>
        </div>
        <button onClick={handleCloseToast} type="button" className="btn-close" aria-label="Close">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
