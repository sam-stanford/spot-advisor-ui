import React from 'react';
import Message from '../../../common/types/Message';
import MessageComponent from './Message';

export default function MessageList(props: {
  messages: Message[];
  removeMessage: (id: string) => void;
}): JSX.Element {
  const { messages, removeMessage } = props;

  return (
    <div className="fixed top-10 right-10 m-0 z-50" aria-live="assertive">
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
    </div>
  );
}
