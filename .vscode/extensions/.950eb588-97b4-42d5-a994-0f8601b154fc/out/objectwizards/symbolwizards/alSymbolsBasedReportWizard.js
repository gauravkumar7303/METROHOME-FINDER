"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALSymbolsBasedReportWizard = void 0;
const fileBuilder_1 = require("../fileBuilder");
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alSymbolsBasedWizard_1 = require("./alSymbolsBasedWizard");
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALSymbolsBasedReportWizard extends alSymbolsBasedWizard_1.ALSymbolsBasedWizard {
    constructor(context) {
        super(context);
    }
    //#region Wizards with UI
    async showWizard(tableSymbols) {
        if (tableSymbols.length == 1)
            await this.showReportWizard(tableSymbols[0]);
        else
            await this.showMultiReportWizard(tableSymbols);
    }
    async showMultiReportWizard(tableSymbols) {
        if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired())
            return;
        const objType = azSymbolKind_1.AZSymbolKind.ReportObject;
        let relativeFileDir = await this.getRelativeFileDir(objType);
        let startObjectId = await this.getObjectId(relativeFileDir, "report", `Please enter a starting ID for the report objects.`, 0);
        if (startObjectId < 0) {
            return;
        }
        for (let i = 0; i < tableSymbols.length; i++) {
            let tableSymbol = tableSymbols[i];
            let objectId = startObjectId + i;
            let objectName = this.getDefaultReportName(tableSymbol);
            await this.createAndShowNewReport(tableSymbol, objType, objectId, objectName, relativeFileDir);
        }
    }
    async showReportWizard(tableSymbol) {
        if (!fileBuilder_1.FileBuilder.checkCrsFileNamePatternRequired())
            return;
        const objType = azSymbolKind_1.AZSymbolKind.ReportObject;
        let relativeFileDir = await this.getRelativeFileDir(objType);
        let objectId = await this.getObjectId(relativeFileDir, "report", "Please enter an ID for the report object.", 0);
        if (objectId < 0) {
            return;
        }
        let objectName = await this.getObjectName("Please enter a name for the report object.", this.getDefaultReportName(tableSymbol));
        if (!objectName)
            return;
        await this.createAndShowNewReport(tableSymbol, objType, objectId, objectName, relativeFileDir);
    }
    async createAndShowNewReport(tableSymbol, objType, objectId, objectName, relativeFileDir) {
        let fileName = await fileBuilder_1.FileBuilder.getPatternGeneratedFullObjectFileName(objType, objectId, objectName);
        this.showNewDocument(this.buildReportForTable(tableSymbol, objectId, objectName), fileName, relativeFileDir);
    }
    //#endregion
    //#region Report builders
    buildReportForTable(tableSymbol, objectId, objectName) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(undefined);
        writer.writeStartObject("report", objectId.toString(), objectName);
        //write dataset
        this.appendDataSet(writer, tableSymbol);
        //write report request page suggetsion
        this.appendReportRequestPage(writer);
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
    appendDataSet(writer, tableSymbol) {
        var dataSetName = writer.createName(tableSymbol.name);
        writer.writeStartNamedBlock("dataset");
        writer.writeStartNameSourceBlock("dataitem", dataSetName, writer.encodeName(tableSymbol.name));
        let fieldList = [];
        tableSymbol.collectChildSymbols(azSymbolKind_1.AZSymbolKind.Field, true, fieldList);
        fieldList.forEach(item => {
            writer.writeNameSourceBlock("column", writer.createName(item.name), writer.encodeName(item.name));
        });
        writer.writeEndBlock();
        writer.writeEndBlock();
    }
    appendReportRequestPage(writer) {
        writer.writeStartNamedBlock("requestpage");
        //layout
        writer.writeStartLayout();
        writer.writeStartGroup("area", "Content");
        writer.writeStartGroup("group", "GroupName");
        writer.writeEndBlock();
        writer.writeEndBlock();
        writer.writeEndLayout();
        //actions
        writer.writeStartNamedBlock("actions");
        writer.writeStartGroup("area", "Processing");
        writer.writeEndBlock();
        writer.writeEndBlock();
        writer.writeEndBlock();
    }
    //#endregion
    //#region Helper Methods
    getDefaultReportName(tableSymbol) {
        return `${tableSymbol.name.trim()} Report`;
    }
}
exports.ALSymbolsBasedReportWizard = ALSymbolsBasedReportWizard;
//# sourceMappingURL=alSymbolsBasedReportWizard.js.map