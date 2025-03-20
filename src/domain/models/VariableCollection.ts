import { Mode } from "../valueObjects/Mode";

export interface VariableCollection {
  id: string;
  name: string;
  modes: Mode[];
  variableIds: string[];
}
