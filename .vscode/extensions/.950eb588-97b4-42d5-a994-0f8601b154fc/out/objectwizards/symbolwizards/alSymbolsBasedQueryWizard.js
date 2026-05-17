"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALSymbolsBasedQueryWizard = void 0;
const fileBuilder_1 = require("../fileBuilder");
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alSymbolsBasedWizard_1 = require("./alSymbolsBasedWizard");
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALSymbolsBasedQueryWizard extends alSymbolsBasedWizard_1.ALSymbolsBasedWizard {
    constructor(context) {
        super(context);
    }
    //#region Wizards with UI
    async showWizard(tableSymbols) {
        if (tableSymbols.length == 1)
            await this.showQueryWizard(tableSymbols[0]);
        else
            await this.showMultiQueryWizard(tableSymbols);
    }
    async showMultiQueryWizard(tableSymbols) {
        if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired())
            return;
        const objType = azSymbolKind_1.AZSymbolKind.QueryObject;
        let relativeFileDir = await this.getRelativeFileDir(objType);
        let startObjectId = await this.getObjectId(relativeFileDir, "query", `Please enter a starting ID for the query objects.`, 0);
        if (startObjectId < 0) {
            return;
        }
        for (let i = 0; i < tableSymbols.length; i++) {
            let tableSymbol = tableSymbols[i];
            let objectId = startObjectId + i;
            let objectName = this.getDefaultQueryName(tableSymbol);
            await this.createAndShowNewQuery(tableSymbol, objType, objectId, objectName, relativeFileDir);
        }
    }
    async showQueryWizard(tableSymbol) {
        if (!fileBuilder_1.FileBuilder.checkCrsFileNamePatternRequired())
            return;
        const objType = azSymbolKind_1.AZSymbolKind.QueryObject;
        let relativeFileDir = await this.getRelativeFileDir(objType);
        let objectId = await this.getObjectId(relativeFileDir, "query", "Please enter an ID for the query object.", 0);
        if (objectId < 0) {
            return;
        }
        let objectName = this.getDefaultQueryName(tableSymbol);
        objectName = await this.getObjectName("Please enter a name for the query object.", objectName);
        if (!objectName) {
            return;
        }
        await this.createAndShowNewQuery(tableSymbol, objType, objectId, objectName, relativeFileDir);
    }
    async createAndShowNewQuery(tableSymbol, objType, objectId, objectName, relativeFileDir) {
        let fileName = await fileBuilder_1.FileBuilder.getPatternGeneratedFullObjectFileName(objType, objectId, objectName);
        this.showNewDocument(this.buildQueryForTable(tableSymbol, objectId, objectName), fileName, relativeFileDir);
    }
    //#endregion
    //#region Query builders
    buildQueryForTable(tableSymbol, objectId, objectName) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(undefined);
        writer.writeStartObject("query", objectId.toString(), objectName);
        writer.writeProperty("QueryType", "Normal");
        writer.writeLine("");
        //write dataset
        this.appendElements(writer, tableSymbol);
        //write triggers
        writer.writeLine("");
        writer.writeLine("trigger OnBeforeOpen()");
        writer.writeLine("begin");
        writer.writeLine("");
        writer.writeLine("end;");
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
    appendElements(writer, tableSymbol) {
        var dataItemName = writer.createName(tableSymbol.name);
        writer.writeStartNamedBlock("elements");
        writer.writeStartNameSourceBlock("dataitem", dataItemName, writer.encodeName(tableSymbol.name));
        let fieldList = [];
        tableSymbol.collectChildSymbols(azSymbolKind_1.AZSymbolKind.Field, true, fieldList);
        fieldList.forEach(item => {
            writer.writeNameSourceBlock("column", writer.createName(item.name), writer.encodeName(item.name));
        });
        writer.writeEndBlock();
        writer.writeEndBlock();
    }
    //#endregion
    //#region Helper Methods
    getDefaultQueryName(tableSymbol) {
        return `${tableSymbol.name.trim()} Query`;
    }
}
exports.ALSymbolsBasedQueryWizard = ALSymbolsBasedQueryWizard;
//# sourceMappingURL=alSymbolsBasedQueryWizard.js.map