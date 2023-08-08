import React, { useCallback, useRef, useState } from 'react';

// contexts
import { useTopicContext } from '@/contexts/TopicContext';

// constants
import { MESSAGE_ERRORS } from '@/constants/errorMessage';
import { REGEX } from '@/constants/regex';

// components
import Input from '@/components/Input/Input';
import Button from '@/components/Button/index';
import Toast from '@/components/Toast/Toast';

// styles
import './index.css';
import { ShowErrors } from '@/helpers/ShowErrors';

export interface Props {
  onClose: () => void;
}

const AddNewTopicModal: React.FC<Props> = ({ onClose }) => {
  const topicNameRef = useRef<string>('');
  const { onAddTopic, isLoading } = useTopicContext();
  const [error, setError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const topicName = topicNameRef.current;

      try {
        await onAddTopic(topicName);

        onClose();
      } catch (error) {
        throw new Error((error as ShowErrors).message);
      }
    },
    [onAddTopic, onClose]
  );

  const handleDismissError = () => {
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    const isValid = REGEX.TRIM_SPACE.test(inputValue);

    if (!isValid) {
      setInputError(MESSAGE_ERRORS.TRIM_SPACE_NOTICE);
    } else {
      setInputError(null);
      inputValue = inputValue.trim();
    }

    topicNameRef.current = inputValue;
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <button className="close-modal-button" onClick={onClose}>
          &times;
        </button>
        <h1>Add New Topic</h1>
        <form onSubmit={handleSubmit} data-testid="topic-form">
          <div className="input-container">
            <Input
              name="topicName"
              placeholder="Enter topic name"
              variant="primary"
              type="text"
              onChange={handleInputChange}
            />
            {inputError && <div className="error-message">{inputError}</div>}
          </div>
          <div className="button-container">
            <Button label="Done" variant="tertiary" type="submit" isDisabled={isLoading} />
          </div>
        </form>
      </div>
      {error && <Toast status="error" message={error} onClose={handleDismissError} />}
    </div>
  );
};

export default React.memo(AddNewTopicModal);
