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
exports.ALReportExtSyntaxBuilder = void 0;
const vscode = __importStar(require("vscode"));
const alSyntaxHelper_1 = require("../../allanguage/alSyntaxHelper");
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
class ALReportExtSyntaxBuilder {
    constructor() {
    }
    buildFromReportExtWizardData(destUri, data) {
        let settings = vscode.workspace.getConfiguration('alOutline', destUri);
        let addDataItemName = !!settings.get('addDataItemToReportColumnName');
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(destUri);
        writer.writeNamespace(data.objectNamespace);
        writer.writeUsings(data.objectUsings);
        writer.writeStartExtensionObject("reportextension", data.objectId, data.objectName, data.baseReport);
        writer.writeStartDataset();
        if (data.dataItems) {
            for (let diidx = 0; diidx < data.dataItems.length; diidx++) {
                if (data.dataItems[diidx].fields.length > 0) {
                    writer.writeStartAdd(alSyntaxHelper_1.ALSyntaxHelper.toNameText(data.dataItems[diidx].name));
                    let fields = data.dataItems[diidx].fields;
                    for (let fldidx = 0; fldidx < fields.length; fldidx++) {
                        writer.writeReportColumn(data.dataItems[diidx].name, fields[fldidx].name, addDataItemName);
                    }
                    writer.writeEndBlock();
                }
            }
        }
        writer.writeEndDataset();
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
}
exports.ALReportExtSyntaxBuilder = ALReportExtSyntaxBuilder;
//# sourceMappingURL=alReportExtSyntaxBuilder.js.map