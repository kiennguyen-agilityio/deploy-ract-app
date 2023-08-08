import axios from 'axios';

// Constants
import { TOPICS_API, VOCABULARY_API } from '@/constants/api';

// helpers
import { ShowErrors } from '@/helpers/ShowErrors';

// interfaces
import { Topic, Vocabulary } from 'interfaces/topic';

export const getTopics = async (): Promise<Topic[]> => {
  try {
    const response = await axios.get(TOPICS_API);
    return response.data;
  } catch (error) {
    throw new Error((error as ShowErrors).message);
  }
};

export const addTopic = async (name: string): Promise<Topic> => {
  try {
    const response = await axios.post(TOPICS_API, { name, quantity: 0 });
    return response.data;
  } catch (error) {
    throw new Error((error as ShowErrors).message);
  }
};

export const getVocabulariesByTopicId = async (topicId: string): Promise<Vocabulary[]> => {
  try {
    const response = await axios.get(`${VOCABULARY_API}?topicId=${topicId}`);
    const vocabulariesData = response.data;
    return vocabulariesData;
  } catch (error) {
    throw new Error((error as ShowErrors).message);
  }
};

export const addVocabulary = async (
  topicId: string,
  vocabulary: Vocabulary
): Promise<Vocabulary> => {
  try {
    const response = await axios.post(`${VOCABULARY_API}?topicId=${topicId}`, vocabulary);
    return response.data;
  } catch (error) {
    throw new Error((error as ShowErrors).message);
  }
};

export const deleteVocabulary = async (vocabularyId: string): Promise<void> => {
  try {
    await axios.delete(`${VOCABULARY_API}/${vocabularyId}`);
  } catch (error) {
    throw new Error((error as ShowErrors).message);
  }
};

export const updateTopicQuantityApi = async (topicId: string, quantity: number) => {
  try {
    const response = await axios.patch(`${TOPICS_API}/${topicId}`, { quantity });
    return response.data;
  } catch (error) {
    throw new Error((error as ShowErrors).message);
  }
};
