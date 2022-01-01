import React, { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Message, { MessageType } from '../../common/types/Message';

import Messages from './MessagesContext';

export default function MessagesProvider(props: {
  children?: React.ReactNode;
}): JSX.Element {
  const { children } = props;

  const [messages, setMessages] = useState<Message[]>([]);

  const newMessage = (message: string, type: MessageType, duration = 3000) => {
    const id = uuidv4();
    setMessages([...messages, { id, message, type }]);
    setTimeout(() => {
      setMessages(messages.filter((m) => m.id !== id));
    }, duration);
  };

  const removeMessage = (id: string) => {
    setMessages(messages.filter((a) => a.id !== id));
  };

  const value = useMemo(() => {
    return { messages, newMessage, removeMessage };
  }, [messages]);

  return <Messages.Provider value={value}>{children}</Messages.Provider>;
}
