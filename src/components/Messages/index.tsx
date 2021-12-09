import React from 'react';
import useMessages from '../../hooks/useMessages';
import MessageList from './MessageList';

export default function Messages(): JSX.Element {
  const { messages, removeMessage } = useMessages();

  return <MessageList messages={messages} removeMessage={removeMessage} />;
}
