import { Reducer } from 'react';

// constants
import { MESSAGE_ERRORS } from '@/constants/errorMessage';

// interfaces
import { Topic } from 'interfaces/topic';

export interface TopicState {
  error: string;
  isLoading: boolean;
  isAdding: boolean;
  topics: Topic[];
}

export type Action =
  | { type: 'FETCH_TOPICS_SUCCESS'; payload: Topic[] }
  | { type: 'FETCH_TOPICS_REQUEST'; payload: Topic[] }
  | { type: 'FETCH_TOPICS_FAILURE'; payload: Topic[] }
  | { type: 'ADD_TOPIC_SUCCESS'; payload: Topic }
  | { type: 'ADD_TOPIC_REQUEST'; payload: string }
  | { type: 'ADD_TOPIC_FAILURE'; payload: string }
  | { type: 'UPDATE_TOPIC_QUANTITY'; payload: { topicId: string; quantity: number } };

const topicReducer: Reducer<TopicState, Action> = (state, action) => {
  switch (action.type) {
    case 'FETCH_TOPICS_REQUEST': {
      return {
        ...state,
        isLoading: true,
      };
    }

    case 'FETCH_TOPICS_SUCCESS': {
      const { payload: fetchTopics } = action;
      return {
        ...state,
        isLoading: false,
        topics: fetchTopics,
      };
    }

    case 'FETCH_TOPICS_FAILURE': {
      return {
        ...state,
        isLoading: false,
        error: MESSAGE_ERRORS.FETCH_TOPICS,
      };
    }

    case 'ADD_TOPIC_REQUEST': {
      return {
        ...state,
        isAdding: true,
      };
    }

    case 'ADD_TOPIC_SUCCESS': {
      const { payload: successTopic } = action;
      return {
        ...state,
        isLoading: false,
        isAdding: false,
        topics: [...state.topics, successTopic],
        error: '',
      };
    }

    case 'ADD_TOPIC_FAILURE': {
      return {
        ...state,
        isLoading: false,
        isAdding: false,
        error: MESSAGE_ERRORS.ADD_TOPIC,
      };
    }

    case 'UPDATE_TOPIC_QUANTITY': {
      const { topicId, quantity } = action.payload;
      return {
        ...state,
        topics: state.topics.map((topic) =>
          topic.id === topicId ? { ...topic, quantity } : topic
        ),
      };
    }

    default:
      return state;
  }
};

export default topicReducer;
