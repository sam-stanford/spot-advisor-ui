import React, { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Message, { CreateMessageInput } from '../../common/types/Message';

import Messages from './MessagesContext';

export default function MessagesProvider(props: {
  children?: React.ReactNode;
}) {
  const { children } = props;

  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: CreateMessageInput) => {
    setMessages([...messages, { ...message, id: uuidv4() }]);
  };

  const removeMessage = (id: string) => {
    setMessages(messages.filter((a) => a.id !== id));
  };

  const value = useMemo(() => {
    return { messages, addMessage, removeMessage };
  }, [messages]);

  return <Messages.Provider value={value}>{children}</Messages.Provider>;
}