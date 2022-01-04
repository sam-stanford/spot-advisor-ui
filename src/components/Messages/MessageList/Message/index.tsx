import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid';
import React from 'react';
import MessageInput, { MessageType } from '../../../../common/types/Message';
import MessageTemplate from './MessageTemplate';

export default function Message(props: {
  message: MessageInput;
  remove: () => void;
}): JSX.Element {
  const { message, remove } = props;

  const SuccessMessage = (
    <MessageTemplate
      Icon={CheckCircleIcon}
      colorString="green"
      message={message}
      remove={remove}
    />
  );

  const InfoMessage = (
    <MessageTemplate
      Icon={InformationCircleIcon}
      colorString="indigo"
      message={message}
      remove={remove}
    />
  );

  const ErrorMessage = (
    <MessageTemplate
      Icon={ExclamationCircleIcon}
      colorString="red"
      message={message}
      remove={remove}
    />
  );

  switch (message.type) {
    case MessageType.Success:
      return SuccessMessage;
    case MessageType.Error:
      return ErrorMessage;
    case MessageType.Info:
      return InfoMessage;
    default:
      return InfoMessage;
  }
}
