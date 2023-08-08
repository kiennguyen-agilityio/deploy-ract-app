import { Reducer } from 'react';

// interfaces
import { Topic, Vocabulary } from 'interfaces/topic';

// constants
import { MESSAGE_ERRORS } from '@/constants/errorMessage';
export interface VocabularyState {
  error: string;
  isLoading: boolean;
  isAdding: boolean;
  byId: {
    [key: string]: Vocabulary[];
  };
  topics: Topic[];
}

export type ActionType =
  | {
      type: 'FETCH_VOCABULARIES_SUCCESS';
      payload: {
        topicId: string;
        vocabularies: Vocabulary[];
      };
    }
  | { type: 'FETCH_VOCABULARIES_REQUEST'; payload: number[] }
  | { type: 'FETCH_VOCABULARIES_FAILURE'; payload: Vocabulary[] }
  | { type: 'ADD_VOCABULARY_REQUEST' }
  | { type: 'ADD_VOCABULARY_SUCCESS'; payload: { topicId: string; vocabulary: Vocabulary } }
  | { type: 'ADD_VOCABULARY_FAILURE' }
  | { type: 'DELETE_VOCABULARY_REQUEST'; payload: string }
  | { type: 'DELETE_VOCABULARY_SUCCESS'; payload: { topicId: string; vocabularyId: string } }
  | { type: 'DELETE_VOCABULARY_FAILURE'; payload: string };

const vocabularyReducer: Reducer<VocabularyState, ActionType> = (state, action) => {
  switch (action.type) {
    case 'FETCH_VOCABULARIES_REQUEST': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'FETCH_VOCABULARIES_SUCCESS': {
      const { topicId, vocabularies } = action.payload;

      return {
        ...state,
        isLoading: false,
        byId: {
          ...state.byId,
          [topicId]: vocabularies,
        },
      };
    }

    case 'FETCH_VOCABULARIES_FAILURE': {
      return {
        ...state,
        isLoading: false,
        error: MESSAGE_ERRORS.FETCH_VOCABULARIES_BY_TOPIC_ID,
      };
    }

    case 'ADD_VOCABULARY_REQUEST':
      return {
        ...state,
        isAdding: true,
      };
    case 'ADD_VOCABULARY_SUCCESS':
      const { topicId: newTopicId, vocabulary } = action.payload;
      const updatedTopics = state.topics.map((topic) =>
        topic.id === newTopicId ? { ...topic, quantity: topic.quantity + 1 } : topic
      );

      return {
        ...state,
        byId: {
          ...state.byId,
          [newTopicId]: [...(state.byId[newTopicId] || []), vocabulary],
        },
        isLoading: false,
        isAdding: false,
        topics: updatedTopics,
        error: '',
      };

    case 'ADD_VOCABULARY_FAILURE':
      return {
        ...state,
        isAdding: false,
        error: MESSAGE_ERRORS.ADD_VOCABULARY,
      };

    case 'DELETE_VOCABULARY_REQUEST': {
      return {
        ...state,
        isAdding: true,
      };
    }

    case 'DELETE_VOCABULARY_SUCCESS': {
      const { topicId, vocabularyId } = action.payload;
      const updatedTopics = state.topics.map((topic) =>
        topic.id === topicId ? { ...topic, quantity: topic.quantity - 1 } : topic
      );
      return {
        ...state,
        byId: {
          ...state.byId,
          [topicId]: state.byId[topicId].filter((vocabulary) => vocabulary.id !== vocabularyId),
        },
        isAdding: false,
        topics: updatedTopics,
      };
    }

    case 'DELETE_VOCABULARY_FAILURE': {
      return {
        ...state,
        isAdding: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default vocabularyReducer;
