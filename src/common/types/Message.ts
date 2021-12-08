export enum MessageType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warn',
  INFO = 'info',
}

type Message = {
  id: string;
  type: MessageType;
  message: string;
  duration?: number;
};
export default Message;

export type CreateMessageInput = Omit<Message, 'id'>;
