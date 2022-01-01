import { useContext } from 'react';
import Message, { MessageType } from '../common/types/Message';
import MessagesContext from '../contexts/Messages/MessagesContext';

export default function useMessages(): {
  messages: Message[];
  newMessage: (message: string, type: MessageType, duration?: number) => void;
  removeMessage: (id: string) => void;
} {
  return useContext(MessagesContext);
}
