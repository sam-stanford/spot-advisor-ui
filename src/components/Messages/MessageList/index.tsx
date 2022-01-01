import React from 'react';
import Message from '../../../common/types/Message';
import MessageComponent from './Message';

export default function MessageList(props: {
  messages: Message[];
  removeMessage: (id: string) => void;
}): JSX.Element {
  const { messages, removeMessage } = props;

  return (
    <div className="fixed bottom-0 w-full m-0 flex items-center justify-center">
      <ul className="w-full max-w-xl">
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
