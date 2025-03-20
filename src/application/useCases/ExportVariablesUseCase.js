var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ExportVariablesUseCase {
    constructor(variableCollectionRepository, variableRepository, processCollectionUseCase) {
        this.variableCollectionRepository = variableCollectionRepository;
        this.variableRepository = variableRepository;
        this.processCollectionUseCase = processCollectionUseCase;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const collections = yield this.variableCollectionRepository.getLocalCollections();
            const files = [];
            for (const collection of collections) {
                files.push(...(yield this.processCollectionUseCase.execute(collection)));
            }
            // マージしたJSONボディを作成
            const mergedBody = Object.assign({}, ...files.map((file) => file.body));
            return mergedBody;
        });
    }
}
