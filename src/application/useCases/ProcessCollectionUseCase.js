var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FormatService } from "../../domain/services/FormatService";
export class ProcessCollectionUseCase {
    constructor(variableRepository) {
        this.variableRepository = variableRepository;
    }
    execute(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = [];
            for (const mode of collection.modes) {
                const file = { body: {} };
                for (const variableId of collection.variableIds) {
                    const variable = yield this.variableRepository.getVariableById(variableId);
                    if (variable !== null) {
                        const { name, resolvedType, valuesByMode } = variable;
                        const value = valuesByMode[mode.modeId];
                        if (value !== undefined) {
                            let obj = file.body;
                            name.split("/").forEach((groupName) => {
                                obj[groupName] = obj[groupName] || {};
                                obj = obj[groupName];
                            });
                            obj.$type = resolvedType === 'FLOAT' ? 'number' : resolvedType.toLowerCase();
                            if (value.type === "VARIABLE_ALIAS" && value.id) {
                                const referencedVar = yield this.variableRepository.getVariableById(value.id);
                                if (referencedVar !== null) {
                                    obj.$value = `{${referencedVar.name.replace(/\//g, ".")}}`;
                                }
                                else {
                                    console.warn(`Variable with ID ${value.id} not found.`);
                                }
                            }
                            else {
                                if (resolvedType === "COLOR") {
                                    obj.$value = FormatService.rgbToHex(value);
                                }
                                else if (resolvedType === "FLOAT") {
                                    const floatValue = value;
                                    obj.$value = Number.isInteger(floatValue)
                                        ? floatValue
                                        : FormatService.formatNumber(floatValue, 2);
                                }
                                else {
                                    obj.$value = value;
                                }
                            }
                        }
                    }
                    else {
                        console.warn(`Variable with ID ${variableId} not found.`);
                    }
                }
                files.push(file);
            }
            return files;
        });
    }
}
