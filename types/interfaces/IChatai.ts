export interface IChatai {
  sender: string;
  text: string;
}

export interface IChaitaiAsk {
  success: boolean;
  messages: IChatai[];
  error?: string;
}

export interface IChataiModel {
  id?: string;
  question: string;
  answer?: string;
  createdAt: Date;
}
