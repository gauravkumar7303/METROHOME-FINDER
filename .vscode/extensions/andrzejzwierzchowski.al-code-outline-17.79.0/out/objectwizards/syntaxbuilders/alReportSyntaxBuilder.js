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
exports.ALReportSyntaxBuilder = void 0;
const vscode = __importStar(require("vscode"));
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
const alSyntaxHelper_1 = require("../../allanguage/alSyntaxHelper");
class ALReportSyntaxBuilder {
    constructor() {
    }
    buildFromReportWizardData(destUri, data) {
        let settings = vscode.workspace.getConfiguration('alOutline', destUri);
        let addDataItemName = settings.get('addDataItemToReportColumnName');
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(destUri);
        writer.writeNamespace(data.objectNamespace);
        writer.writeUsings(data.objectUsings);
        writer.writeStartObject("report", data.objectId, data.objectName);
        writer.addProperty("Caption", writer.encodeString(alSyntaxHelper_1.ALSyntaxHelper.removePrefixSuffix(data.objectName, data.projectSettings)));
        //write layout path
        if (data.rdlcLayout != "")
            writer.addProperty("RDLCLayout", writer.encodeString(data.rdlcLayout));
        if (data.wordLayout != "")
            writer.addProperty("WordLayout", writer.encodeString(data.wordLayout));
        if ((data.usageCategory) && (data.usageCategory !== "") && (data.usageCategory !== "None")) {
            //application area requires useage category to be set
            if ((data.applicationArea) && (data.applicationArea !== ""))
                writer.addProperty("ApplicationArea", data.applicationArea);
            writer.addProperty("UsageCategory", data.usageCategory);
        }
        writer.writeProperties();
        //write dataset
        this.writeDataSet(writer, data, addDataItemName);
        //write report request page suggetsion
        if (data.createRequestPage)
            this.writeRequestPage(writer);
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
    writeDataSet(writer, data, addDataItemName) {
        let dataSetName = writer.createName(data.selectedTable);
        writer.writeStartNamedBlock("dataset");
        writer.writeStartNameSourceBlock("dataitem", dataSetName, writer.encodeName(data.selectedTable));
        if (data.selectedFieldList) {
            for (let i = 0; i < data.selectedFieldList.length; i++) {
                let columnName = writer.createName(data.selectedFieldList[i].name);
                if (addDataItemName)
                    columnName = columnName + "_" + dataSetName;
                writer.writeNameSourceBlock("column", columnName, writer.encodeName(data.selectedFieldList[i].name));
            }
        }
        writer.writeEndBlock();
        writer.writeEndBlock();
    }
    writeRequestPage(writer) {
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
}
exports.ALReportSyntaxBuilder = ALReportSyntaxBuilder;
//# sourceMappingURL=alReportSyntaxBuilder.js.map