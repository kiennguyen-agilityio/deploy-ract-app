// Import dependencies and modules
import axios from 'axios';
import {
  addTopic,
  addVocabulary,
  deleteVocabulary,
  getTopics,
  getVocabulariesByTopicId,
  updateTopicQuantityApi,
} from '@/services/api-action';
import { TOPICS_API, VOCABULARY_API } from '@/constants/api';

// Mock the axios.get method
jest.mock('axios');

const axiosGetSpy = jest.spyOn(axios, 'get');
const axiosPostSpy = jest.spyOn(axios, 'post');
const axiosDeleteSpy = jest.spyOn(axios, 'delete');
const axiosPatchSpy = jest.spyOn(axios, 'patch');

const mockResponse = {
  data: [
    { id: 1, name: 'Topic 1' },
    { id: 2, name: 'Topic 2' },
    {
      id: 1,
      name: 'Test Topic',
      quantity: 0,
    },
  ],
};

const vocabulary = {
  id: '1',
  word: 'Test Word',
  topicId: '1',
  firstLanguage: 'English',
  secondLanguage: 'Spanish',
};

describe('getTopics', () => {
  it('should return topics data when axios.get is successful', async () => {
    axiosGetSpy.mockResolvedValue(mockResponse);

    const result = await getTopics();

    expect(axios.get).toHaveBeenCalledWith(TOPICS_API);
    expect(result).toEqual(mockResponse.data);
  });

  test('should throw an error if the GET request fails', async () => {
    const mockedError = new Error('Sample error message');
    (axios.get as jest.Mock).mockRejectedValueOnce(mockedError);

    await expect(getTopics()).rejects.toThrow('Sample error message');
  });

  it('should return the topic data when successful', async () => {
    axiosPostSpy.mockResolvedValueOnce(mockResponse);

    const result = await addTopic('Test Topic');

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(TOPICS_API, { name: 'Test Topic', quantity: 0 });
  });

  test('should throw an error if the POST request fails', async () => {
    const mockedError = new Error('Sample error message');
    (axios.post as jest.Mock).mockRejectedValueOnce(mockedError);

    await expect(addTopic('sample-name')).rejects.toThrow('Sample error message');
  });

  it('should return the added vocabulary data when successful', async () => {
    const topicId = '1';

    axiosPostSpy.mockResolvedValueOnce(mockResponse);

    const result = await addVocabulary(topicId, vocabulary);

    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(`${VOCABULARY_API}?topicId=${topicId}`, vocabulary);
  });

  it('should return vocabularies data when API call is successful', async () => {
    // Arrange
    const topicId = '1';
    const expectedVocabulariesData = [{ word: 'apple', definition: 'a fruit' }];
    axiosGetSpy.mockResolvedValue({ data: expectedVocabulariesData });

    // Act
    const result = await getVocabulariesByTopicId(topicId);

    // Assert
    expect(result).toEqual(expectedVocabulariesData);
    expect(axios.get).toHaveBeenCalledWith(`${VOCABULARY_API}?topicId=${topicId}`);
  });

  it('should throw an error when API call fails', async () => {
    const topicId = 'your-topic-id';
    const expectedError = new Error('API call failed');
    axiosGetSpy.mockRejectedValue(expectedError);

    await expect(getVocabulariesByTopicId(topicId)).rejects.toThrowError(expectedError);
    expect(axios.get).toHaveBeenCalledWith(`${VOCABULARY_API}?topicId=${topicId}`);
  });

  it('should return the error message if the request fails', async () => {
    const topicId = 'some-topic-id';
    const errorMessage = 'An error occurred';

    axiosPostSpy.mockRejectedValueOnce({ message: errorMessage });

    const result = await addVocabulary(topicId, vocabulary);

    expect(result).toEqual(errorMessage);
    expect(axios.post).toHaveBeenCalledWith(`${VOCABULARY_API}?topicId=${topicId}`, vocabulary);
  });

  it('calls axios.delete with the correct URL', async () => {
    const vocabularyId = '1';
    await deleteVocabulary(vocabularyId);

    expect(axios.delete).toHaveBeenCalledWith(`${VOCABULARY_API}/${vocabularyId}`);
  });

  it('should throw an error when API call fails', async () => {
    // Arrange
    const vocabularyId = 'your-vocabulary-id';
    const expectedError = new Error('API call failed');
    axiosDeleteSpy.mockRejectedValue(expectedError);

    // Act & Assert
    await expect(deleteVocabulary(vocabularyId)).rejects.toThrowError(expectedError);
    expect(axios.delete).toHaveBeenCalledWith(`${VOCABULARY_API}/${vocabularyId}`);
  });

  it('calls axios.patch with the correct URL and payload', async () => {
    const topicId = '1';
    const quantity = 10;
    const expectedPayload = { quantity };
    const mockResponse = { data: 'Updated quantity' };

    axiosPatchSpy.mockResolvedValueOnce(mockResponse);

    const result = await updateTopicQuantityApi(topicId, quantity);

    expect(axios.patch).toHaveBeenCalledWith(`${TOPICS_API}/${topicId}`, expectedPayload);
    expect(result).toBe(mockResponse.data);
  });

  it('should throw an error with the message when an error occurs', async () => {
    const topicId = 'topic-123';
    const quantity = 10;

    axiosPatchSpy.mockRejectedValueOnce(new Error('Network Error'));

    await expect(updateTopicQuantityApi(topicId, quantity)).rejects.toThrowError('Network Error');
  });
});
