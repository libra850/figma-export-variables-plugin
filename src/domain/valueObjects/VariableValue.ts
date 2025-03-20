export type VariableValueType = "VARIABLE_ALIAS" | "FLOAT" | "COLOR";

export interface VariableValue {
  type: VariableValueType;
  id?: string;
  r?: number;
  g?: number;
  b?: number;
  a?: number;
}
