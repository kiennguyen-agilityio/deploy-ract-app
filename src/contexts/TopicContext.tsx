import React, { ReactNode, createContext, useContext, useEffect, useMemo, useReducer } from 'react';

// services
import { getTopics, addTopic } from '@/services/api-action';

// reducers
import topicReducer, { TopicState } from '@/reducers/topicReducer';

// interfaces
import { Topic } from 'interfaces/topic';

interface TopicProviderProps {
  children: ReactNode;
}

export const initialTopicState: TopicState = {
  error: '',
  isLoading: false,
  isAdding: false,
  topics: [],
};

interface TopicContextValue {
  error: string;
  isAdding: boolean;
  isLoading: boolean;
  topics: Topic[];
  onAddTopic: (name: string) => Promise<void>;
  onFetchTopic: () => Promise<void>;
}

const TopicContext = createContext<TopicContextValue>({
  error: '',
  isAdding: false,
  isLoading: false,
  topics: [],
  onAddTopic: async () => {},
  onFetchTopic: async () => {},
});

export const useTopicContext = () => useContext(TopicContext);

export const TopicProvider: React.FC<TopicProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(topicReducer, initialTopicState);
  const { isLoading, error, topics, isAdding } = state;

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      dispatch({ type: 'FETCH_TOPICS_REQUEST', payload: [] });

      const data = await getTopics();

      dispatch({ type: 'FETCH_TOPICS_SUCCESS', payload: data });
    } catch {
      dispatch({ type: 'FETCH_TOPICS_FAILURE', payload: [] });
    }
  };

  const handleAddTopic = async (name: string) => {
    try {
      dispatch({ type: 'ADD_TOPIC_REQUEST', payload: '' });
      const response = await addTopic(name);
      const newTopic: Topic = response;

      dispatch({ type: 'ADD_TOPIC_SUCCESS', payload: newTopic });
    } catch {
      dispatch({
        type: 'ADD_TOPIC_FAILURE',
        payload: 'Error adding new topic',
      });
    }
  };

  const value = useMemo(
    () => ({
      error,
      isLoading,
      isAdding,
      onAddTopic: handleAddTopic,
      onFetchTopic: fetchTopics,
      topics: topics,
    }),
    [topics, handleAddTopic]
  );

  return <TopicContext.Provider value={value}>{children}</TopicContext.Provider>;
};
