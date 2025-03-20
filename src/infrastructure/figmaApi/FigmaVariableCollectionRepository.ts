import { VariableCollection } from "../../domain/models/VariableCollection";
import { VariableCollectionRepository } from "../../domain/repositories/VariableCollectionRepository";

export class FigmaVariableCollectionRepository implements VariableCollectionRepository {
  async getLocalCollections(): Promise<VariableCollection[]> {
    try {
      return await figma.variables.getLocalVariableCollectionsAsync();
    } catch (error) {
      console.error("Error fetching variable collections:", error);
      return [];
    }
  }
}
