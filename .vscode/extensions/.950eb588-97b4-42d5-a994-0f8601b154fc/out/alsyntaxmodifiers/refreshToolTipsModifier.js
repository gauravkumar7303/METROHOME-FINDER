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
exports.RefreshToolTipsModifier = void 0;
const vscode = __importStar(require("vscode"));
const toolsGetDependenciesListRequest_1 = require("../langserver/symbolsinformation/toolsGetDependenciesListRequest");
const numberHelper_1 = require("../tools/numberHelper");
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class RefreshToolTipsModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    _dependencies;
    constructor(context) {
        super(context, "Refresh ToolTips from Dependencies", "refreshToolTips");
        this._dependencies = undefined;
    }
    getParameters(uri) {
        let parameters = super.getParameters(uri);
        parameters.sortProperties = this.sortPropertiesOnSave(uri);
        if (this._dependencies)
            for (let i = 0; i < this._dependencies.length; i++) {
                let name = "dependencyName" + i.toString();
                parameters[name] = this._dependencies[i];
            }
        return parameters;
    }
    async confirmRunForWorkspace() {
        let confirmation = await vscode.window.showInformationMessage('Do you want to refresh tooltips from dependencies in all files in the current project folder?', 'Yes', 'No');
        return (confirmation === 'Yes');
    }
    getSuccessWorkspaceMessage(response) {
        return numberHelper_1.NumberHelper.zeroIfNotDef(response.parameters.noOfChanges).toString() +
            ' tooltip(s) updated in ' +
            numberHelper_1.NumberHelper.zeroIfNotDef(response.parameters.noOfChangedFiles).toString() +
            ' file(s).';
    }
    getSuccessDocumentMessage(response) {
        return response.parameters.noOfChanges.toString() +
            ' tooltip(s) updated.';
    }
    loadDefaultParameters(uri) {
        let defaultParameters = vscode.workspace.getConfiguration('alOutline', uri).get('reuseToolTipsFromDependencies');
        if ((!defaultParameters) || (defaultParameters.length == 0))
            return false;
        this._dependencies = defaultParameters;
        return true;
    }
    async askForParameters(uri) {
        //load list of dependencies
        if (!uri)
            return false;
        let response = await this._context.toolsLangServerClient.getDependenciesList(new toolsGetDependenciesListRequest_1.ToolsGetDependenciesListRequest(uri?.fsPath));
        if ((!response) || (!response.dependencies) || (response.dependencies.length == 0))
            return false;
        //ask for Application Area Type
        this._dependencies = await vscode.window.showQuickPick(response.dependencies, {
            canPickMany: true,
            placeHolder: 'Select Dependencies'
        });
        return ((!!this._dependencies) && (this._dependencies.length > 0));
    }
}
exports.RefreshToolTipsModifier = RefreshToolTipsModifier;
//# sourceMappingURL=refreshToolTipsModifier.js.map