export enum MessageType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

type Message = {
  id: string;
  type: MessageType;
  message: string;
};
export default Message;
