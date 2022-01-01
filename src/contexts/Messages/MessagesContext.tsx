import React from 'react';
import Message, { MessageType } from '../../common/types/Message';

const MessagesContext = React.createContext<{
  messages: Message[];
  newMessage: (message: string, type: MessageType, duration?: number) => void;
  removeMessage: (id: string) => void;
}>({
  messages: [],
  newMessage: () => undefined,
  removeMessage: () => undefined,
});

export default MessagesContext;
