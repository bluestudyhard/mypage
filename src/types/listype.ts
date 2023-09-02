export interface ListType {
  id?: number;
  done: boolean;
  text?: string;
  time: string;
  [proName: string]: any;
}
export interface ItemType {
  id?: number;
  done: boolean;
  text?: string;
  time: string;
}
