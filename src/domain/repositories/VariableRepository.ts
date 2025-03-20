import { Variable } from "../models/Variable";

export interface VariableRepository {
  getVariableById(id: string): Promise<Variable | null>;
  getAllVariables(): Promise<Variable[]>;
}
