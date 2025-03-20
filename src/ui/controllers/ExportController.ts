import { ExportVariablesUseCase } from "../../application/useCases/ExportVariablesUseCase";

export class ExportController {
  constructor(private exportVariablesUseCase: ExportVariablesUseCase) {}

  async handleExportRequest(): Promise<void> {
    try {
      const jsonData = await this.exportVariablesUseCase.execute();
      figma.ui.postMessage({ mergedBody: jsonData });
    } catch (error) {
      console.error("Error exporting variables:", error);
      figma.ui.postMessage({ error: "Failed to export variables" });
    }
  }

  setupMessageHandlers(): void {
    figma.ui.onmessage = async (message: unknown) => {
      console.log("code received message", message);
      await this.handleExportRequest();
    };
  }
}
