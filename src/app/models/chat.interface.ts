import { Offer } from './offer.interface'
import { UserInterface } from './user.interface'

export interface Message {
  id?: string;
  direction?: string;
  chat_id?: string;
  author_id?: string;
  user_id?: string;
  file?: string;
  message: string;
  created_at: string;
  status?: string;
}

export interface Chat {
  id: string;
  offer_id: string;
  user_1: string;
  user_2: string;
  created_at: string;
  users: any[];
  user: UserInterface;
  offer: Offer;
  last_message: Message;
}

export interface Data {
  chats: Chat[];
}

export interface PostData {
  token: string;
}



