"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALSymbolsBasedReportExtWizard = void 0;
const fileBuilder_1 = require("../fileBuilder");
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alSymbolsBasedWizard_1 = require("./alSymbolsBasedWizard");
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALSymbolsBasedReportExtWizard extends alSymbolsBasedWizard_1.ALSymbolsBasedWizard {
    constructor(context) {
        super(context);
    }
    //#region Wizards with UI
    async showWizard(symbols) {
        if (symbols.length == 1)
            await this.showReportExtWizard(symbols[0]);
        else
            await this.showMultiReportExtWizard(symbols);
    }
    async showMultiReportExtWizard(reportSymbols) {
        if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired() || !fileBuilder_1.FileBuilder.checkCrsExtensionObjectNamePatternRequired(true))
            return;
        const extObjType = azSymbolKind_1.AZSymbolKind.ReportExtensionObject;
        let relativeFileDir = await this.getRelativeFileDir(extObjType);
        let startObjectId = await this.getObjectId(relativeFileDir, "reportextension", "Please enter a starting ID for the report extensions.", 0);
        if (startObjectId < 0) {
            return;
        }
        for (let i = 0; i < reportSymbols.length; i++) {
            let reportSymbol = reportSymbols[i];
            let extObjectId = startObjectId + i;
            let extObjectName = await fileBuilder_1.FileBuilder.getPatternGeneratedExtensionObjectName(extObjType, extObjectId, reportSymbol);
            await this.createAndShowNewReportExtension(reportSymbol, extObjType, extObjectId, extObjectName, relativeFileDir);
        }
    }
    async showReportExtWizard(reportSymbol) {
        if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired() || !fileBuilder_1.FileBuilder.checkCrsExtensionObjectNamePatternRequired(false))
            return;
        const extObjType = azSymbolKind_1.AZSymbolKind.ReportExtensionObject;
        let relativeFileDir = await this.getRelativeFileDir(extObjType);
        let extObjectId = await this.getObjectId(relativeFileDir, "reportextension", "Please enter an ID for the report extension.", 0);
        if (extObjectId < 0) {
            return;
        }
        let extObjectName = await fileBuilder_1.FileBuilder.getPatternGeneratedExtensionObjectName(extObjType, extObjectId, reportSymbol);
        if (!extObjectName)
            extObjectName = reportSymbol.name + ' Extension';
        extObjectName = await this.getObjectName("Please enter a name for the report extension.", extObjectName);
        if (!extObjectName) {
            return;
        }
        await this.createAndShowNewReportExtension(reportSymbol, extObjType, extObjectId, extObjectName, relativeFileDir);
    }
    async createAndShowNewReportExtension(reportSymbol, extObjType, extObjectId, extObjectName, relativeFileDir) {
        let fileName = await fileBuilder_1.FileBuilder.getPatternGeneratedExtensionObjectFileName(extObjType, extObjectId, extObjectName, reportSymbol);
        this.showNewDocument(this.buildReportExtForReport(reportSymbol, extObjectId, extObjectName), fileName, relativeFileDir);
    }
    //#endregion
    //#region Report Extension builders
    buildReportExtForReport(reportSymbol, objectId, extObjectName) {
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(undefined);
        writer.writeStartExtensionObject("reportextension", objectId.toString(), extObjectName, reportSymbol.name);
        writer.writeStartDataset();
        writer.writeLine("");
        writer.writeEndDataset();
        writer.writeLine("");
        writer.writeStartRequestPage();
        writer.writeLine("");
        writer.writeEndRequestPage();
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
}
exports.ALSymbolsBasedReportExtWizard = ALSymbolsBasedReportExtWizard;
//# sourceMappingURL=alSymbolsBasedReportExtWizard.js.map