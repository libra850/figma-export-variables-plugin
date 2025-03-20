import { VariableValue } from "../valueObjects/VariableValue";

export interface Variable {
  id: string;
  name: string;
  resolvedType: string;
  valuesByMode: Record<string, VariableValue>;
}
