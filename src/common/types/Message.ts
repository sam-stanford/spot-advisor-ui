export enum MessageType {
  Success = 'success',
  Error = 'error',
  Warning = 'warn',
  Info = 'info',
}

type Message = {
  id: string;
  type: MessageType;
  message: string;
};
export default Message;
