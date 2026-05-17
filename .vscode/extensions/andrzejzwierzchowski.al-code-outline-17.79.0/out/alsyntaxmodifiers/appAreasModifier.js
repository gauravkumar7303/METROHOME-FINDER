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
exports.AppAreasModifier = void 0;
const vscode = __importStar(require("vscode"));
const numberHelper_1 = require("../tools/numberHelper");
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class AppAreasModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    _appArea;
    constructor(context) {
        super(context, "Add App Areas", "addAppAreas");
        this._appArea = undefined;
    }
    getParameters(uri) {
        let parameters = super.getParameters(uri);
        parameters.appArea = this._appArea;
        parameters.appAreaMode = this._context.alLangProxy.getAppAreaMode(uri);
        parameters.sortProperties = this.sortPropertiesOnSave(uri);
        return parameters;
    }
    async confirmRunForWorkspace() {
        let confirmation = await vscode.window.showInformationMessage('Do you want to add missing application areas to all files in the current project folder?', 'Yes', 'No');
        return (confirmation === 'Yes');
    }
    getSuccessWorkspaceMessage(response) {
        return numberHelper_1.NumberHelper.zeroIfNotDef(response.parameters.noOfChanges).toString() +
            ' application area(s) added to ' +
            numberHelper_1.NumberHelper.zeroIfNotDef(response.parameters.noOfChangedFiles).toString() +
            ' file(s).';
    }
    getSuccessDocumentMessage(response) {
        return response.parameters.noOfChanges.toString() +
            ' application area(s) added.';
    }
    loadDefaultParameters(uri) {
        let settings = vscode.workspace.getConfiguration('alOutline', uri);
        this._appArea = settings.get('defaultAppArea');
        return ((!!this._appArea) && (this._appArea != ''));
    }
    async askForParameters(uri) {
        let appAreasList = ['Basic', 'FixedAsset', 'All', 'Custom'];
        //ask for Application Area Type
        let appAreaName = await vscode.window.showQuickPick(appAreasList, {
            canPickMany: false,
            placeHolder: 'Select Application Area'
        });
        if (!appAreaName)
            return false;
        if (appAreaName === 'Custom') {
            appAreaName = await vscode.window.showInputBox({
                placeHolder: "Enter your custom Application Area"
            });
            if (!appAreaName)
                return false;
        }
        this._appArea = appAreaName;
        return true;
    }
}
exports.AppAreasModifier = AppAreasModifier;
//# sourceMappingURL=appAreasModifier.js.map