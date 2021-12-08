import React, { useContext } from 'react';
import MessagesContext from '../../contexts/Messages/MessagesContext';
import MessageList from './MessageList';

export default function Messages() {
  const { messages, removeMessage } = useContext(MessagesContext);

  return <MessageList messages={messages} removeMessage={removeMessage} />;
}
