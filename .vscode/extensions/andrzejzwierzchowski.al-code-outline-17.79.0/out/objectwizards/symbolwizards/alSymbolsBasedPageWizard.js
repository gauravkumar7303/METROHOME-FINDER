"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALSymbolsBasedPageWizard = void 0;
const vscode = __importStar(require("vscode"));
const azSymbolKind_1 = require("../../symbollibraries/azSymbolKind");
const alSymbolsBasedWizard_1 = require("./alSymbolsBasedWizard");
const fileBuilder_1 = require("../fileBuilder");
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALSymbolsBasedPageWizard extends alSymbolsBasedWizard_1.ALSymbolsBasedWizard {
    constructor(context) {
        super(context);
    }
    //#region Wizards with UI
    async showWizard(tableSymbols, pageType) {
        if (tableSymbols.length == 1)
            await this.showPageWizard(tableSymbols[0], pageType);
        else
            await this.showMultiPageWizard(tableSymbols, pageType);
    }
    async showMultiPageWizard(tableSymbols, pageType) {
        if (!fileBuilder_1.FileBuilder.checkCrsExtensionFileNamePatternRequired())
            return;
        const objType = azSymbolKind_1.AZSymbolKind.PageObject;
        let relativeFileDir = await this.getRelativeFileDir(objType);
        let startObjectId = await this.getObjectId(relativeFileDir, "page", `Please enter a starting ID for the ${pageType} pages.`, 0);
        if (startObjectId < 0) {
            return;
        }
        for (let i = 0; i < tableSymbols.length; i++) {
            let tableSymbol = tableSymbols[i];
            let objectId = startObjectId + i;
            let objectName = this.getDefaultPageName(tableSymbol, pageType);
            await this.createAndShowNewPage(tableSymbol, objType, objectId, objectName, pageType, relativeFileDir);
        }
    }
    async showPageWizard(tableSymbol, pageType) {
        if (!fileBuilder_1.FileBuilder.checkCrsFileNamePatternRequired())
            return;
        const objType = azSymbolKind_1.AZSymbolKind.PageObject;
        let relativeFileDir = await this.getRelativeFileDir(objType);
        let objectId = await this.getObjectId(relativeFileDir, "page", `Please enter an ID for the ${pageType} page.`, 0);
        if (objectId < 0) {
            return;
        }
        let objectName = this.getDefaultPageName(tableSymbol, pageType);
        objectName = await this.getObjectName(`Please enter a name for the ${pageType} page.`, objectName);
        if (!objectName) {
            return;
        }
        await this.createAndShowNewPage(tableSymbol, objType, objectId, objectName, pageType, relativeFileDir);
    }
    async createAndShowNewPage(tableSymbol, objType, objectId, objectName, pageType, relativeFileDir) {
        let fileName = await fileBuilder_1.FileBuilder.getPatternGeneratedFullObjectFileName(objType, objectId, objectName);
        let pageContents;
        if (pageType === 'List') {
            pageContents = this.buildListPageForTable(tableSymbol, objectId, objectName);
        }
        else if (pageType === 'Card') {
            pageContents = this.buildCardPageForTable(tableSymbol, objectId, objectName);
        }
        else {
            vscode.window.showErrorMessage(`Page generator for page type: ${pageType} not implemented.`);
            return;
        }
        this.showNewDocument(pageContents, fileName, relativeFileDir);
    }
    //#endregion
    //#region Page builders
    buildListPageForTable(tableSymbol, objectId, objectName) {
        return this.buildPageForTable(tableSymbol, objectId, objectName, "List", "repeater");
    }
    buildCardPageForTable(tableSymbol, objectId, objectName) {
        return this.buildPageForTable(tableSymbol, objectId, objectName, "Card", "group");
    }
    buildPageForTable(tableSymbol, objectId, objectName, pageType, fieldGroupType) {
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(undefined);
        writer.writeStartObject("page", objectId.toString(), objectName);
        writer.writeLine("");
        writer.addProperty("PageType", pageType);
        writer.addProperty("SourceTable", writer.encodeName(tableSymbol.name));
        writer.addProperty("Caption", writer.encodeString(objectName));
        //usage category and application area for list pages
        if (pageType === "List") {
            let appArea = vscode.workspace.getConfiguration('alOutline').get('defaultAppArea');
            let usageCategory = vscode.workspace.getConfiguration('alOutline').get('defaultListUsageCategory');
            if ((usageCategory) && (usageCategory !== "")) {
                //application area requires useage category to be set
                if ((appArea) && (appArea !== ""))
                    writer.addProperty("ApplicationArea", appArea);
                writer.addProperty("UsageCategory", usageCategory);
            }
        }
        writer.writeProperties();
        writer.writeLine("");
        writer.writeStartLayout();
        writer.writeStartGroup("area", "Content");
        writer.writeStartGroup(fieldGroupType, "General");
        let fieldList = [];
        tableSymbol.collectChildSymbols(azSymbolKind_1.AZSymbolKind.Field, true, fieldList);
        fieldList.forEach(item => {
            writer.writePageField(item.name, item.name, undefined, undefined, false, undefined);
        });
        writer.writeEndBlock();
        writer.writeEndBlock();
        writer.writeEndLayout();
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
    //#endregion
    //#region Helper Methods
    getDefaultPageName(tableSymbol, pageType) {
        return `${tableSymbol.name.trim()} ${pageType}`;
    }
}
exports.ALSymbolsBasedPageWizard = ALSymbolsBasedPageWizard;
//# sourceMappingURL=alSymbolsBasedPageWizard.js.map