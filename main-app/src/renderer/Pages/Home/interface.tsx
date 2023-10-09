export type IMessageType = {
  text: string;
  id: string;
  author: "human" | "ai";
};

export type MessageItemProps = { message: IMessageType };
