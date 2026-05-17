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
exports.DataClassificationModifier = void 0;
const vscode = __importStar(require("vscode"));
const numberHelper_1 = require("../tools/numberHelper");
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class DataClassificationModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    _dataClassification;
    constructor(context) {
        super(context, "Add Data Classification", "addDataClassification");
        this._dataClassification = undefined;
    }
    getParameters(uri) {
        let parameters = super.getParameters(uri);
        parameters.dataClassification = this._dataClassification;
        parameters.sortProperties = this.sortPropertiesOnSave(uri);
        return parameters;
    }
    async confirmRunForWorkspace() {
        let confirmation = await vscode.window.showInformationMessage('Do you want to add missing data classification and remove them from flowfields in all files in the current project folder?', 'Yes', 'No');
        return (confirmation === 'Yes');
    }
    getSuccessWorkspaceMessage(response) {
        return numberHelper_1.NumberHelper.zeroIfNotDef(response.parameters.noOfChanges).toString() +
            ' data classification(s) added/removed to/from ' +
            numberHelper_1.NumberHelper.zeroIfNotDef(response.parameters.noOfChangedFiles).toString() +
            ' file(s).';
    }
    getSuccessDocumentMessage(response) {
        return response.parameters.noOfChanges.toString() +
            ' data classification(s) added or removed.';
    }
    loadDefaultParameters(uri) {
        this._dataClassification = vscode.workspace.getConfiguration('alOutline', uri).get('defaultDataClassification');
        return ((!!this._dataClassification) && (this._dataClassification != ''));
    }
    async askForParameters(uri) {
        let valuesList = ['AccountData', 'CustomerContent',
            'EndUserIdentifiableInformation', 'EndUserPseudonymousIdentifiers',
            'OrganizationIdentifiableInformation', 'SystemMetadata'];
        //ask for Application Area Type
        this._dataClassification = await vscode.window.showQuickPick(valuesList, {
            canPickMany: false,
            placeHolder: 'Select Data Classification'
        });
        return !!this._dataClassification;
    }
}
exports.DataClassificationModifier = DataClassificationModifier;
//# sourceMappingURL=dataClassificationModifier.js.map