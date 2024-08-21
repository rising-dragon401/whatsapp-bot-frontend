export type ChatHistory = {
  role: string,
  content: string
}

export type User = {
  _id: string,
  avatar?: string,
  chat_id: string,
  name?: string
  phone_number: string,
  bot_number: string,
  bot_id: string,
  chat_title: string,
  chat_history: ChatHistory[],
  userroles: string,
  summary: string,
  history_cursor: number,
  created_at: string,
  updated_at: string
}

export type AdminUser = {
  email: string,
  name: string,
  avatar: string,
}