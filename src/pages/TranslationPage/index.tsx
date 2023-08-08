import { Link, useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';

// contexts
import { useVocabularyContext } from '@/contexts/VocabularyContext';

//constants
import { MESSAGE_ERRORS } from '@/constants/errorMessage';
import { REGEX } from '@/constants/regex';

// components
import Input from '@/components/Input/Input';
import Button from '@/components/Button/index';
import Toast from '@/components/Toast/Toast';

// pages
import TopicTable from '@/pages/TranslationPage/TopicTable';

// styles
import './index.css';

const TranslationPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>() as { topicId: string };
  const { fetchVocabulariesByTopicId, getVocabulariesById, onAddVocabulary, onDeleteVocabulary } =
    useVocabularyContext();
  const firstLanguageRef = useRef<string>('');
  const secondLanguageRef = useRef<string>('');
  const [error, setError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  const handleAddNew = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const firstLanguage = firstLanguageRef.current;
      const secondLanguage = secondLanguageRef.current;

      try {
        await onAddVocabulary(topicId, {
          id: new Date().getTime().toString(),
          firstLanguage,
          secondLanguage,
          topicId,
        });
      } catch {
        setError(MESSAGE_ERRORS.ADD_VOCABULARY);
      }
    },
    [onAddVocabulary, topicId]
  );

  const handleDismissError = () => {
    setError(null);
  };

  const handleDelete = async (vocabularyId: string) => {
    onDeleteVocabulary(topicId, vocabularyId);
  };

  const handleChangeFirstLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    const isValid = REGEX.TRIM_SPACE.test(inputValue);

    if (!isValid) {
      setInputError(MESSAGE_ERRORS.TRIM_SPACE_NOTICE);
    } else {
      setInputError(null);
    }

    firstLanguageRef.current = inputValue.trim();
    firstLanguageRef.current = inputValue;
  };

  const handleChangeSecondLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    const isValid = REGEX.TRIM_SPACE.test(inputValue);

    if (!isValid) {
      setInputError(MESSAGE_ERRORS.TRIM_SPACE_NOTICE);
    } else {
      setInputError(null);
    }

    secondLanguageRef.current = inputValue.trim();
    secondLanguageRef.current = inputValue;
  };

  useEffect(() => {
    fetchVocabulariesByTopicId(topicId);
  }, [topicId]);

  const vocabularies = getVocabulariesById(topicId || '');

  return (
    <div className="translate-container">
      <h1>Make Vocabulary with Translation</h1>

      <h2>
        Add <span className="min-5">(Min 5)</span> words of English and translate it to Vietnamese
      </h2>

      <form onSubmit={handleAddNew}>
        <div className="input-row">
          <Input
            variant="secondary"
            name="english"
            title="English(native)"
            onChange={handleChangeFirstLanguage}
          />
          {inputError && <div className="error-message">{inputError}</div>}
          <Input
            variant="secondary"
            name="vietnamese"
            title="Vietnamese"
            onChange={handleChangeSecondLanguage}
          />
          {inputError && <div className="error-message">{inputError}</div>}

          <Button type="submit" variant="tertiary" size="sm" label="Add" />
        </div>
      </form>

      <TopicTable onDelete={handleDelete} topicId={topicId} vocabularies={vocabularies} />

      <Link to="/">
        <Button variant="tertiary" label="Back to homepage" />
      </Link>

      {error && <Toast status="error" message={error} onClose={handleDismissError} />}
    </div>
  );
};

export default TranslationPage;
