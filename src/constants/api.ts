export const URL_API = {
  BASE_URL: process.env.VITE_BASE_URL,
  TOPICS_URL: '/topics',
  VOCABULARY_URL: '/vocabularies',
};

const TOPICS_API = `${URL_API.BASE_URL}${URL_API.TOPICS_URL}`;
const VOCABULARY_API = `${URL_API.BASE_URL}${URL_API.VOCABULARY_URL}`;

export { TOPICS_API, VOCABULARY_API };

