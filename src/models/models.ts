export type Things = {
  id: number;
  name: string;
};

export interface ThingsStructure {
  read(): Promise<Things[]>;
  readById(): Promise<Things>;
  write(): Promise<void>;
  update(): Promise<void>;
  delete(): Promise<void>;
}
