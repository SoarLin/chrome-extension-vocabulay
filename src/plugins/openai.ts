import { Configuration, OpenAIApi } from 'openai';

const isDevelopment = import.meta.env.MODE === 'development';

const getApiKey = async () => {
  if (isDevelopment) {
    return import.meta.env.VITE_OPENAI_API_KEY;
  }

  return new Promise((resolve) => {
    chrome.storage.local.get(['openaiApiKey'], (result) => {
      resolve(result.openaiApiKey);
    });
  });
};

export const createOpenAIClient = async () => {
  const apiKey = await getApiKey();

  const configuration = new Configuration({
    apiKey: apiKey as string,
  });

  return new OpenAIApi(configuration);
};