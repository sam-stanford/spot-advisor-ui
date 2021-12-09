import { useContext } from 'react';
import Message, { CreateMessageInput } from '../common/types/Message';
import MessagesContext from '../contexts/Messages/MessagesContext';

export default function useMessages(): {
  messages: Message[];
  newMessage: (Notification: CreateMessageInput) => void;
  removeMessage: (id: string) => void;
} {
  return useContext(MessagesContext);
}
