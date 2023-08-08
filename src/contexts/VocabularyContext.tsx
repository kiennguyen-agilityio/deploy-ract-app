import { createContext, ReactNode, useContext, useMemo, useReducer, useState } from 'react';

// reducers
import vocabularyReducer, { VocabularyState } from '@/reducers/vocabularyReducer';

// services
import {
  getVocabulariesByTopicId,
  addVocabulary,
  deleteVocabulary,
  updateTopicQuantityApi,
} from '@/services/api-action';

// interfaces
import { Vocabulary } from 'interfaces/topic';
import topicReducer from '@/reducers/topicReducer';
import { initialTopicState } from './TopicContext';

interface VocabularyProviderProps {
  children: ReactNode;
}

const initialVocabularyState: VocabularyState = {
  error: '',
  isLoading: false,
  isAdding: false,
  byId: {},
  topics: [],
};

interface VocabularyContextValue {
  error: string;
  isLoading: boolean;
  isAdding: boolean;
  byId: {
    [key: string]: Vocabulary[];
  };
  getVocabulariesById: (topicId: string) => Vocabulary[];
  fetchVocabulariesByTopicId: (topicId: string) => void;
  onAddVocabulary: (topicId: string, vocabulary: Vocabulary) => void;
  onDeleteVocabulary: (topicId: string, vocabularyId: string) => void;
}

const VocabularyContext = createContext<VocabularyContextValue>({
  error: '',
  isLoading: false,
  isAdding: false,
  byId: {},
  getVocabulariesById: () => [],
  fetchVocabulariesByTopicId: () => {},
  onAddVocabulary: () => {},
  onDeleteVocabulary: () => {},
});

export const useVocabularyContext = () => useContext(VocabularyContext);

export const VocabularyProvider: React.FC<VocabularyProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(vocabularyReducer, initialVocabularyState);
  const [_, topicDispatch] = useReducer(topicReducer, initialTopicState);

  const { isLoading, error, byId, isAdding } = state;

  const fetchVocabulariesByTopicId = async (topicId: string) => {
    dispatch({ type: 'FETCH_VOCABULARIES_REQUEST', payload: [] });

    try {
      const data = await getVocabulariesByTopicId(topicId);
      dispatch({ type: 'FETCH_VOCABULARIES_SUCCESS', payload: { topicId, vocabularies: data } });
    } catch (error) {
      dispatch({ type: 'FETCH_VOCABULARIES_FAILURE', payload: [] });
    }
  };

  const getVocabulariesById = (topicId: string): Vocabulary[] => {
    return byId[topicId] || [];
  };

  const handleAddVocabulary = async (topicId: string, vocabulary: Vocabulary) => {
    dispatch({ type: 'ADD_VOCABULARY_REQUEST' });

    try {
      const newVocabulary = await addVocabulary(topicId, vocabulary);

      const updateTopicQuantity = await updateTopicQuantityApi(
        topicId,
        getVocabulariesById(topicId).length
      );
      dispatch({ type: 'ADD_VOCABULARY_SUCCESS', payload: { topicId, vocabulary: newVocabulary } });
      topicDispatch({ type: 'UPDATE_TOPIC_QUANTITY', payload: updateTopicQuantity });
    } catch {
      dispatch({ type: 'ADD_VOCABULARY_FAILURE' });
    }
  };

  const handleDeleteVocabulary = async (topicId: string, vocabularyId: string) => {
    dispatch({ type: 'DELETE_VOCABULARY_REQUEST', payload: topicId });

    try {
      await deleteVocabulary(vocabularyId);

      const updatedVocabularies = await getVocabulariesByTopicId(topicId);
      const newQuantity = updatedVocabularies.length;
      const updateTopicQuantity = await updateTopicQuantityApi(topicId, newQuantity);

      dispatch({ type: 'DELETE_VOCABULARY_SUCCESS', payload: { topicId, vocabularyId } });
      topicDispatch({ type: 'UPDATE_TOPIC_QUANTITY', payload: updateTopicQuantity });
    } catch {
      dispatch({ type: 'DELETE_VOCABULARY_FAILURE', payload: '' });
    }
  };

  const value = useMemo(
    () => ({
      isLoading,
      byId,
      fetchVocabulariesByTopicId,
      getVocabulariesByTopicId,
      isAdding,
      error,
      getVocabulariesById,
      onAddVocabulary: handleAddVocabulary,
      onDeleteVocabulary: handleDeleteVocabulary,
    }),
    [
      byId,
      isLoading,
      fetchVocabulariesByTopicId,
      getVocabulariesByTopicId,
      isAdding,
      error,
      handleAddVocabulary,
      handleDeleteVocabulary,
      handleDeleteVocabulary,
    ]
  );

  return <VocabularyContext.Provider value={value}>{children}</VocabularyContext.Provider>;
};
