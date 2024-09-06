export type Wabot = {
  _id: string,
  avatar?: string,
  image?: string,
  name: string,
  description?: string,
  price: number,
  visitor: number,
  bot_number: string,
  system_prompt: string,
  gpt_model: string,
  openai_api_key: string
}