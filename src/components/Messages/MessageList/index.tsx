import React from 'react';
import Message from '../../../common/types/Message';
import MessageComponent from './Message';

export default function MessageList(props: {
  messages: Message[];
  removeMessage: (id: string) => void;
}): JSX.Element {
  const { messages, removeMessage } = props;

  return (
    <ul>
      {messages.map((message) => {
        return (
          <MessageComponent
            key={message.id}
            message={message}
            remove={() => removeMessage(message.id)}
          />
        );
      })}
    </ul>
  );
}
