import { createContext } from 'react';
import Message, { MessageType } from '../../common/types/Message';

const MessagesContext = createContext<{
  messages: Message[];
  newMessage: (message: string, type: MessageType, duration?: number) => void;
  removeMessage: (id: string) => void;
}>({
  messages: [],
  newMessage: () => undefined,
  removeMessage: () => undefined,
});

export default MessagesContext;
