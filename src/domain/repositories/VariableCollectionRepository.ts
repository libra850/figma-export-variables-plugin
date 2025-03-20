import { VariableCollection } from "../models/VariableCollection";

export interface VariableCollectionRepository {
  getLocalCollections(): Promise<VariableCollection[]>;
}
