import React from 'react';
import Message, { CreateMessageInput } from '../../common/types/Message';

const MessagesContext = React.createContext<{
  messages: Message[];
  newMessage: (Notification: CreateMessageInput) => void;
  removeMessage: (id: string) => void;
}>({
  messages: [],
  newMessage: () => undefined,
  removeMessage: () => undefined,
});

export default MessagesContext;
