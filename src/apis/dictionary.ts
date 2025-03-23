import { createOpenAIClient } from '../plugins/openai'

export const lookUpWord = async (word: string) => {
  const openai = await createOpenAIClient()
  const content = `我要查詢個單字'${word}',請用JSON回傳給我中文解釋(meaning)以及英文例句(sentence)，英文例句包含(中文解釋)`
  const { data } = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are an English dictionary'},
      { role: 'user', content }
    ],
  })
  return data
}
