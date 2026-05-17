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
exports.ToolTipModifier = void 0;
const vscode = __importStar(require("vscode"));
const numberHelper_1 = require("../tools/numberHelper");
const stringHelper_1 = require("../tools/stringHelper");
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
const alFieldToolTipsLocation_1 = require("../allanguage/alFieldToolTipsLocation");
class ToolTipModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "Add ToolTips", "addToolTips");
    }
    getParameters(uri) {
        let parameters = super.getParameters(uri);
        let config = vscode.workspace.getConfiguration('alOutline', uri);
        parameters.toolTipField = this.getFieldTooltip(config);
        parameters.toolTipFieldComment = this.getFieldTooltipComment(config);
        parameters.toolTipAction = this.getActionTooltip(config);
        parameters.useFieldDescription = this.getUseFieldDescription(config);
        parameters.sortProperties = this.sortPropertiesOnSave(uri);
        parameters.createFieldToolTips = this.createFieldToolTips(uri);
        parameters.createActionToolTips = true;
        parameters.reuseToolTips = !config.get('doNotReuseToolTipsFromOtherPages');
        let toolTipsSource = config.get('reuseToolTipsFromDependencies');
        if (toolTipsSource) {
            for (let i = 0; i < toolTipsSource.length; i++) {
                let name = "toolTipDependency" + i.toString();
                parameters[name] = toolTipsSource[i];
            }
        }
        return parameters;
    }
    async confirmRunForWorkspace() {
        let confirmation = await vscode.window.showInformationMessage('Do you want to add missing tool tips to all files in the current project folder?', 'Yes', 'No');
        return (confirmation === 'Yes');
    }
    getSuccessWorkspaceMessage(response) {
        return numberHelper_1.NumberHelper.zeroIfNotDef(response.parameters.noOfChanges).toString() +
            ' toolTip(s) added to ' +
            numberHelper_1.NumberHelper.zeroIfNotDef(response.parameters.noOfChangedFiles).toString() +
            ' file(s).';
    }
    getSuccessDocumentMessage(response) {
        return response.parameters.noOfChanges.toString() +
            ' ToolTip(s) added.';
    }
    getActionTooltip(config) {
        let toolTip = stringHelper_1.StringHelper.emptyIfNotDef(config.get('pageActionToolTip'));
        if (toolTip == '') {
            toolTip = 'Executes the action %1';
        }
        return toolTip;
    }
    getFieldTooltip(config) {
        let toolTip = stringHelper_1.StringHelper.emptyIfNotDef(config.get('pageFieldToolTip'));
        if (toolTip == '') {
            toolTip = 'Specifies the value for the field %1';
        }
        return toolTip;
    }
    getFieldTooltipComment(config) {
        let toolTip = stringHelper_1.StringHelper.emptyIfNotDef(config.get('pageFieldToolTipComment'));
        if (toolTip === '') {
            toolTip = '%Caption.Comment%';
        }
        if (toolTip === '%%Caption.Comment%') {
            toolTip = '%Caption.Comment%';
        }
        return toolTip;
    }
    getUseFieldDescription(config) {
        let value = !!config.get('useTableFieldDescriptionAsToolTip');
        return value;
    }
    createFieldToolTips(uri) {
        let location = this._context.alLangProxy.fieldToolTipsLocation(uri);
        return (location === alFieldToolTipsLocation_1.ALFieldToolTipsLocation.page);
    }
}
exports.ToolTipModifier = ToolTipModifier;
//# sourceMappingURL=toolTipsModifier.js.map