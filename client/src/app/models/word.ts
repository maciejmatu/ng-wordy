export interface Word {
  foreignWord: string,
  nativeWord: string
}

export interface CreateWord extends Word {
  edit: boolean;
}
