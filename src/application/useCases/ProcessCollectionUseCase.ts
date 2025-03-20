import { VariableCollection } from "../../domain/models/VariableCollection";
import { VariableRepository } from "../../domain/repositories/VariableRepository";
import { VariableValue } from "../../domain/valueObjects/VariableValue";
import { FormatService } from "../../domain/services/FormatService";

export class ProcessCollectionUseCase {
  constructor(private variableRepository: VariableRepository) {}

  async execute(collection: VariableCollection): Promise<Array<{ body: Record<string, unknown> }>> {
    const files = [];

    for (const mode of collection.modes) {
      const file = { body: {} as Record<string, unknown> };

      for (const variableId of collection.variableIds) {
        const variable = await this.variableRepository.getVariableById(variableId);

        if (variable !== null) {
          const { name, resolvedType, valuesByMode } = variable;
          const value: VariableValue = valuesByMode[mode.modeId];

          if (value !== undefined) {
            let obj = file.body as Record<string, unknown>;
            name.split("/").forEach((groupName) => {
              obj[groupName] = obj[groupName] || {};
              obj = obj[groupName] as Record<string, unknown>;
            });

            obj.$type = resolvedType === 'FLOAT' ? 'number' : resolvedType.toLowerCase();

            if (value.type === "VARIABLE_ALIAS" && value.id) {
              const referencedVar = await this.variableRepository.getVariableById(value.id);

              if (referencedVar !== null) {
                obj.$value = `{${referencedVar.name.replace(/\//g, ".")}}`;
              } else {
                console.warn(`Variable with ID ${value.id} not found.`);
              }
            } else {
              if (resolvedType === "COLOR") {
                obj.$value = FormatService.rgbToHex(value);
              } else if (resolvedType === "FLOAT") {
                const floatValue = value as unknown as number;
                obj.$value = Number.isInteger(floatValue)
                  ? floatValue
                  : FormatService.formatNumber(floatValue, 2);
              } else {
                obj.$value = value;
              }
            }
          }
        } else {
          console.warn(`Variable with ID ${variableId} not found.`);
        }
      }

      files.push(file);
    }

    return files;
  }
}
