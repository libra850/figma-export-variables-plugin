var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class FigmaVariableRepository {
    getVariableById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield figma.variables.getVariableByIdAsync(id);
            }
            catch (error) {
                console.error(`Error fetching variable with ID ${id}:`, error);
                return null;
            }
        });
    }
    getAllVariables() {
        return __awaiter(this, void 0, void 0, function* () {
            // Figma APIでは全変数の一括取得メソッドが現状提供されていないため
            // 必要に応じて実装方法を検討
            return [];
        });
    }
}
