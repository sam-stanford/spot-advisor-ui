import React from 'react';
import Message, { CreateMessageInput } from '../../common/types/Message';

const MessagesContext = React.createContext<{
  messages: Message[];
  addMessage: (Notification: CreateMessageInput) => void;
  removeMessage: (id: string) => void;
}>({
  messages: [],
  addMessage: () => undefined,
  removeMessage: () => undefined,
});

export default MessagesContext;
