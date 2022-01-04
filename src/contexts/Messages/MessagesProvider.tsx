import React, { ReactNode, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Message, { MessageType } from '../../common/types/Message';

import MessagesContext from './MessagesContext';

export default function MessagesProvider(props: {
  children?: ReactNode;
}): JSX.Element {
  const { children } = props;

  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const removeMessage = (id: string) => {
    setMessages(messagesRef.current.filter((a) => a.id !== id));
  };

  const newMessage = (message: string, type: MessageType, duration = 8000) => {
    const id = uuidv4();
    setMessages([...messagesRef.current, { id, message, type }]);
    setTimeout(() => {
      removeMessage(id);
    }, duration);
  };

  const value = useMemo(() => {
    return { newMessage, removeMessage, messages };
  }, [messages]);

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
}
