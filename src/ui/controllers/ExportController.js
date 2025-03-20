var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ExportController {
    constructor(exportVariablesUseCase) {
        this.exportVariablesUseCase = exportVariablesUseCase;
    }
    handleExportRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jsonData = yield this.exportVariablesUseCase.execute();
                figma.ui.postMessage({ mergedBody: jsonData });
            }
            catch (error) {
                console.error("Error exporting variables:", error);
                figma.ui.postMessage({ error: "Failed to export variables" });
            }
        });
    }
    setupMessageHandlers() {
        figma.ui.onmessage = (message) => __awaiter(this, void 0, void 0, function* () {
            console.log("code received message", message);
            yield this.handleExportRequest();
        });
    }
}
