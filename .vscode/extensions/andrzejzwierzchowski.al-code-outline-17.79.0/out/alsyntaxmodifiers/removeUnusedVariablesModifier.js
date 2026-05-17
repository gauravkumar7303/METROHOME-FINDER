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
exports.RemoveUnusedVariablesModifier = void 0;
const vscode = __importStar(require("vscode"));
const nameValueQuickPickItem_1 = require("../tools/nameValueQuickPickItem");
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class RemoveUnusedVariablesModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    _variableTypes;
    constructor(context) {
        super(context, "Remove Unused Variables", "removeUnusedVariables");
        this._variableTypes = {
            removeGlobalVariables: false,
            removeProtectedGlobalVariables: false,
            removeLocalVariables: false,
            removeLocalMethodParameters: false
        };
    }
    getParameters(uri) {
        let parameters = super.getParameters(uri);
        this.copySettings(parameters, this._variableTypes);
        return parameters;
    }
    areSettingsEmpty(value) {
        return ((!value) || ((!value.removeGlobalVariables) &&
            (!value.removeProtectedGlobalVariables) &&
            (!value.removeLocalVariables) &&
            (!value.removeLocalMethodParameters)));
    }
    copySettings(dest, src) {
        if (!src) {
            src = {};
        }
        dest.removeGlobalVariables = !!src.removeGlobalVariables;
        dest.removeProtectedGlobalVariables = !!src.removeProtectedGlobalVariables;
        dest.removeLocalVariables = !!src.removeLocalVariables;
        dest.removeLocalMethodParameters = !!src.removeLocalMethodParameters;
    }
    loadDefaultParameters(uri) {
        let defaultParameters = vscode.workspace.getConfiguration('alOutline', uri).get('defaultRemoveUnusedVariablesSettings');
        if (this.areSettingsEmpty(defaultParameters)) {
            return false;
        }
        //get state from previous versions of the extension (global variables and protected global variables were using the same setting in previous versions)
        if ((defaultParameters) && (defaultParameters.removeProtectedGlobalVariables === undefined)) {
            defaultParameters.removeProtectedGlobalVariables = defaultParameters.removeGlobalVariables;
        }
        this.copySettings(this._variableTypes, defaultParameters);
        return true;
    }
    async askForParameters(uri) {
        this.loadState();
        let quickPickItems = [
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Global variables', 'removeGlobalVariables', !!this._variableTypes.removeGlobalVariables),
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Protected global variables', 'removeProtectedGlobalVariables', !!this._variableTypes.removeProtectedGlobalVariables),
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Local variables', 'removeLocalVariables', !!this._variableTypes.removeLocalVariables),
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Local methods parameters', 'removeLocalMethodParameters', !!this._variableTypes.removeLocalMethodParameters)
        ];
        let selectedValues = await vscode.window.showQuickPick(quickPickItems, { canPickMany: true, placeHolder: 'Select variables to remove' });
        if (!selectedValues) {
            return false;
        }
        this.clearVariableTypes();
        let data = {};
        if (selectedValues) {
            for (let i = 0; i < selectedValues.length; i++) {
                data[selectedValues[i].value] = true;
            }
        }
        if (this.areSettingsEmpty(data)) {
            return false;
        }
        this.copySettings(this._variableTypes, data);
        this.saveState();
        return true;
    }
    loadState() {
        let vsctx = this._context.vscodeExtensionContext;
        this._variableTypes.removeGlobalVariables = !!vsctx.globalState.get("azALDevTools.remUVar.removeGlobalVariables");
        this._variableTypes.removeLocalVariables = !!vsctx.globalState.get("azALDevTools.remUVar.removeLocalVariables");
        this._variableTypes.removeLocalMethodParameters = !!vsctx.globalState.get("azALDevTools.remUVar.removeLocalMethodParameters");
        //get state from previous versions of the extension (global variables and protected global variables were using the same setting in previous versions)
        let removeProtectedVariables = vsctx.globalState.get("azALDevTools.remUVar.removeProtectedGlobalVariables");
        if (removeProtectedVariables === undefined) {
            removeProtectedVariables = this._variableTypes.removeGlobalVariables;
        }
        this._variableTypes.removeProtectedGlobalVariables = !!removeProtectedVariables;
        //set defaults
        if ((!this._variableTypes.removeGlobalVariables) &&
            (!this._variableTypes.removeProtectedGlobalVariables) &&
            (!this._variableTypes.removeLocalVariables) &&
            (!this._variableTypes.removeLocalMethodParameters)) {
            this._variableTypes.removeGlobalVariables = true;
            this._variableTypes.removeProtectedGlobalVariables = true;
            this._variableTypes.removeLocalVariables = true;
            this._variableTypes.removeLocalMethodParameters = false;
        }
    }
    saveState() {
        let vsctx = this._context.vscodeExtensionContext;
        vsctx.globalState.update("azALDevTools.remUVar.removeGlobalVariables", !!this._variableTypes.removeGlobalVariables);
        vsctx.globalState.update("azALDevTools.remUVar.removeProtectedGlobalVariables", !!this._variableTypes.removeProtectedGlobalVariables);
        vsctx.globalState.update("azALDevTools.remUVar.removeLocalVariables", !!this._variableTypes.removeLocalVariables);
        vsctx.globalState.update("azALDevTools.remUVar.removeLocalMethodParameters", !!this._variableTypes.removeLocalMethodParameters);
    }
    clearVariableTypes() {
        this._variableTypes.removeGlobalVariables = false;
        this._variableTypes.removeProtectedGlobalVariables = false;
        this._variableTypes.removeLocalVariables = false;
        this._variableTypes.removeLocalMethodParameters = false;
    }
}
exports.RemoveUnusedVariablesModifier = RemoveUnusedVariablesModifier;
//# sourceMappingURL=removeUnusedVariablesModifier.js.map