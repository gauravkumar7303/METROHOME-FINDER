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
exports.ALPageSyntaxBuilder = void 0;
const vscode = __importStar(require("vscode"));
const alSyntaxHelper_1 = require("../../allanguage/alSyntaxHelper");
const alSyntaxWriter_1 = require("../../allanguage/alSyntaxWriter");
const appAreaMode_1 = require("../../alsyntaxmodifiers/appAreaMode");
class ALPageSyntaxBuilder {
    constructor() {
    }
    buildFromPageWizardData(destUri, data) {
        let config = vscode.workspace.getConfiguration('alOutline', destUri);
        let useTableFieldCaptionsInApi = !!config.get('useTableFieldCaptionsInApiFields');
        //generate file content
        let writer = new alSyntaxWriter_1.ALSyntaxWriter(destUri);
        if (data.applicationArea) {
            writer.applicationArea = data.applicationArea;
        }
        writer.applicationAreaMode = data.applicationAreaMode;
        let isApi = (data.pageType.toLowerCase() === "api");
        writer.writeNamespace(data.objectNamespace);
        writer.writeUsings(data.objectUsings);
        writer.writeStartObject("page", data.objectId, data.objectName);
        writer.addProperty("PageType", data.pageType);
        if (data.selectedTable) {
            writer.addProperty("SourceTable", writer.encodeName(data.selectedTable));
        }
        if (isApi) {
            writer.addProperty("APIPublisher", writer.encodeString(data.apiPublisher));
            writer.addProperty("APIGroup", writer.encodeString(data.apiGroup));
            writer.addProperty("APIVersion", writer.encodeString(data.apiVersion));
            writer.addProperty("EntityName", writer.encodeString(data.entityName));
            writer.addProperty("EntitySetName", writer.encodeString(data.entitySetName));
            writer.addProperty("DelayedInsert", "true");
            writer.addProperty("Caption", writer.encodeString(writer.createApiName(data.objectName)));
        }
        else {
            writer.addProperty("Caption", writer.encodeString(alSyntaxHelper_1.ALSyntaxHelper.removePrefixSuffix(data.objectName, data.projectSettings)));
        }
        let pageAppAreaAdded = false;
        //usage category and application area for list pages
        if (data.pageType === "List") {
            if ((data.usageCategory) && (data.usageCategory !== "")) {
                //application area requires useage category to be set
                if ((data.applicationArea) && (data.applicationArea !== "") && (data.usageCategory !== "None")) {
                    writer.addProperty("ApplicationArea", data.applicationArea);
                    pageAppAreaAdded = true;
                }
                writer.addProperty("UsageCategory", data.usageCategory);
            }
        }
        if ((!pageAppAreaAdded) && (data.applicationArea) && (data.applicationArea !== "") && (data.applicationAreaMode == appAreaMode_1.AppAreaMode.inheritFromMainObject)) {
            writer.addProperty("ApplicationArea", data.applicationArea);
            pageAppAreaAdded = true;
        }
        writer.writeProperties();
        writer.writeLine("");
        writer.writeStartLayout();
        writer.writeStartGroup("area", "Content");
        if (data.isFastTabsPageType()) {
            if (data.fastTabsData) {
                for (let tabIdx = 0; tabIdx < data.fastTabsData.length; tabIdx++) {
                    let fastTab = data.fastTabsData[tabIdx];
                    writer.writeStartGroup("group", fastTab.name);
                    writer.writeProperty("Caption", writer.encodeString(fastTab.name));
                    writer.writeLine("");
                    if (fastTab.fields) {
                        for (let fldIdx = 0; fldIdx < fastTab.fields.length; fldIdx++) {
                            writer.writePageField(fastTab.fields[fldIdx].name, fastTab.fields[fldIdx].caption, fastTab.fields[fldIdx].captionLabel?.comment, fastTab.fields[fldIdx].description, data.createTooltips, fastTab.fields[fldIdx].toolTips);
                        }
                    }
                    writer.writeEndBlock();
                }
            }
        }
        else {
            writer.writeStartGroup("repeater", "General");
            if (data.selectedFieldList) {
                for (let i = 0; i < data.selectedFieldList.length; i++) {
                    if (isApi)
                        writer.writeApiPageField(data.selectedFieldList[i].name, data.selectedFieldList[i].caption, data.selectedFieldList[i].captionLabel?.comment, useTableFieldCaptionsInApi);
                    else
                        writer.writePageField(data.selectedFieldList[i].name, data.selectedFieldList[i].caption, data.selectedFieldList[i].captionLabel?.comment, data.selectedFieldList[i].description, data.createTooltips, data.selectedFieldList[i].toolTips);
                }
            }
            if ((isApi) && (data.selectedFlowFilterList))
                for (let i = 0; i < data.selectedFlowFilterList.length; i++)
                    writer.writeApiPageField(data.selectedFlowFilterList[i].name, data.selectedFlowFilterList[i].caption, data.selectedFlowFilterList[i].captionLabel?.comment, useTableFieldCaptionsInApi);
            writer.writeEndBlock();
        }
        writer.writeEndBlock();
        writer.writeEndLayout();
        writer.writeEndObject();
        return writer.toWizardGeneratedString();
    }
}
exports.ALPageSyntaxBuilder = ALPageSyntaxBuilder;
//# sourceMappingURL=alPageSyntaxBuilder.js.map