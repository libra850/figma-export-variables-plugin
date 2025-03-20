import { VariableCollectionRepository } from "../../domain/repositories/VariableCollectionRepository";
import { VariableRepository } from "../../domain/repositories/VariableRepository";
import { ProcessCollectionUseCase } from "./ProcessCollectionUseCase";

export class ExportVariablesUseCase {
  constructor(
    private variableCollectionRepository: VariableCollectionRepository,
    private variableRepository: VariableRepository,
    private processCollectionUseCase: ProcessCollectionUseCase
  ) {}

  async execute(): Promise<Record<string, unknown>> {
    const collections = await this.variableCollectionRepository.getLocalCollections();
    const files = [];

    for (const collection of collections) {
      files.push(...(await this.processCollectionUseCase.execute(collection)));
    }

    // マージしたJSONボディを作成
    const mergedBody = Object.assign({}, ...files.map((file) => file.body));
    return mergedBody;
  }
}
