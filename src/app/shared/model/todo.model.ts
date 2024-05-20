export interface Todo {
  id?: number | string
  name: string;
  description : string
}

export interface TodoErrorType {
  type : TodoTypeEnum
}

export enum TodoTypeEnum {
  ADD = 'Add',
  UPDATE = 'Update',
  EDIT = 'Edit',
  LIST = 'List',
  DELETE = 'Delete'
}