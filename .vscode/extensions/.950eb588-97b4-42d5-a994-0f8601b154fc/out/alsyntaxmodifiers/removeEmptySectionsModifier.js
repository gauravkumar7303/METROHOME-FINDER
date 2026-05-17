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
exports.RemoveEmptySectionsModifier = void 0;
const vscode = __importStar(require("vscode"));
const nameValueQuickPickItem_1 = require("../tools/nameValueQuickPickItem");
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class RemoveEmptySectionsModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    _settings;
    constructor(context) {
        super(context, "Remove Empty Sections", "removeEmptySections");
        this._settings = {
            removeActionGroups: true,
            removeActions: true,
            ignoreComments: false,
            includeObsolete: false
        };
    }
    getParameters(uri) {
        let parameters = super.getParameters(uri);
        this.copySettings(parameters, this._settings);
        return parameters;
    }
    copySettings(dest, src) {
        if (!src) {
            src = {};
        }
        dest.removeActionGroups = !!src.removeActionGroups;
        dest.removeActions = !!src.removeActions;
        dest.ignoreComments = !!src.ignoreComments;
        dest.includeObsolete = !!src.includeObsolete;
    }
    loadDefaultParameters(uri) {
        let defaultParameters = vscode.workspace.getConfiguration('alOutline', uri).get('defaultRemoveEmptySectionsSettings');
        if (!defaultParameters) {
            return false;
        }
        this.copySettings(this._settings, defaultParameters);
        return true;
    }
    async askForParameters(uri) {
        this.loadState();
        let quickPickItems = [
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Empty Action Groups', 'removeActionGroups', !!this._settings.removeActionGroups),
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Empty Actions', 'removeActions', !!this._settings.removeActions),
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Ignore comments inside section', 'ignoreComments', !!this._settings.ignoreComments),
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Include obsolete elements', 'includeObsolete', !!this._settings.includeObsolete)
        ];
        let selectedValues = await vscode.window.showQuickPick(quickPickItems, { canPickMany: true, placeHolder: 'Select elements to remove' });
        if (!selectedValues) {
            return false;
        }
        this.clearSettings();
        let data = {};
        if (selectedValues) {
            for (let i = 0; i < selectedValues.length; i++) {
                data[selectedValues[i].value] = true;
            }
        }
        this.copySettings(this._settings, data);
        this.saveState();
        return true;
    }
    loadState() {
        let vsctx = this._context.vscodeExtensionContext;
        this._settings.removeActionGroups = this.getBoolSetting(vsctx, "azALDevTools.remESectionsremoveActionGroups", !!this._settings.removeActionGroups);
        this._settings.removeActions = this.getBoolSetting(vsctx, "azALDevTools.remESectionsremoveActions", !!this._settings.removeActions);
        this._settings.ignoreComments = this.getBoolSetting(vsctx, "azALDevTools.remESectionsignoreComments", !!this._settings.ignoreComments);
        this._settings.includeObsolete = this.getBoolSetting(vsctx, "azALDevTools.remESectionsincludeObsolete", !!this._settings.includeObsolete);
    }
    getBoolSetting(vsctx, name, defVal) {
        let val = vsctx.globalState.get(name);
        if (val === undefined) {
            return defVal;
        }
        return !!val;
    }
    saveState() {
        let vsctx = this._context.vscodeExtensionContext;
        vsctx.globalState.update("azALDevTools.remESectionsremoveActionGroups", !!this._settings.removeActionGroups);
        vsctx.globalState.update("azALDevTools.remESectionsremoveActions", !!this._settings.removeActions);
        vsctx.globalState.update("azALDevTools.remESectionsignoreComments", !!this._settings.ignoreComments);
        vsctx.globalState.update("azALDevTools.remESectionsincludeObsolete", !!this._settings.includeObsolete);
    }
    clearSettings() {
        this._settings.removeActionGroups = false;
        this._settings.removeActions = false;
        this._settings.ignoreComments = false;
        this._settings.includeObsolete = false;
    }
}
exports.RemoveEmptySectionsModifier = RemoveEmptySectionsModifier;
//# sourceMappingURL=removeEmptySectionsModifier.js.map