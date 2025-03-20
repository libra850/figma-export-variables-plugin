import { Variable } from "../../domain/models/Variable";
import { VariableRepository } from "../../domain/repositories/VariableRepository";

export class FigmaVariableRepository implements VariableRepository {
  async getVariableById(id: string): Promise<Variable | null> {
    try {
      return await figma.variables.getVariableByIdAsync(id);
    } catch (error) {
      console.error(`Error fetching variable with ID ${id}:`, error);
      return null;
    }
  }

  async getAllVariables(): Promise<Variable[]> {
    // Figma APIでは全変数の一括取得メソッドが現状提供されていないため
    // 必要に応じて実装方法を検討
    return [];
  }
}
