export interface Word {
  foreignWord: string,
  nativeWord: string,
  id: string
}

export interface CreateWord extends Word {
  edit: boolean;
}
