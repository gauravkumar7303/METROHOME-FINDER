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
exports.RemoveEmptyTriggersModifier = void 0;
const vscode = __importStar(require("vscode"));
const nameValueQuickPickItem_1 = require("../tools/nameValueQuickPickItem");
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class RemoveEmptyTriggersModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    _settings;
    constructor(context) {
        super(context, "Remove Empty Triggers", "removeEmptyTriggers");
        this._settings = {
            removeTriggers: true,
            removeSubscribers: true,
            ignoreComments: false
        };
    }
    getParameters(uri) {
        let parameters = super.getParameters(uri);
        this.copySettings(parameters, this._settings);
        return parameters;
    }
    areSettingsEmpty(value) {
        return ((!value) || ((!value.removeTriggers) &&
            (!value.removeSubscribers)));
    }
    copySettings(dest, src) {
        if (!src)
            src = {};
        dest.removeTriggers = !!src.removeTriggers;
        dest.removeSubscribers = !!src.removeSubscribers;
        dest.ignoreComments = !!src.ignoreComments;
    }
    loadDefaultParameters(uri) {
        let defaultParameters = vscode.workspace.getConfiguration('alOutline', uri).get('defaultRemoveEmptyTriggersSettings');
        if (this.areSettingsEmpty(defaultParameters))
            return false;
        this.copySettings(this._settings, defaultParameters);
        return true;
    }
    async askForParameters(uri) {
        this.loadState();
        let quickPickItems = [
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Empty Triggers', 'removeTriggers', !!this._settings.removeTriggers),
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Empty Event Subscribers', 'removeSubscribers', !!this._settings.removeSubscribers),
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Ignore comments in method body', 'ignoreComments', !!this._settings.ignoreComments)
        ];
        let selectedValues = await vscode.window.showQuickPick(quickPickItems, { canPickMany: true, placeHolder: 'Select elements to remove' });
        if (!selectedValues)
            return false;
        this.clearSettings();
        let data = {};
        if (selectedValues) {
            for (let i = 0; i < selectedValues.length; i++) {
                data[selectedValues[i].value] = true;
            }
        }
        if (this.areSettingsEmpty(data))
            return false;
        this.copySettings(this._settings, data);
        this.saveState();
        return true;
    }
    loadState() {
        let vsctx = this._context.vscodeExtensionContext;
        this._settings.removeTriggers = !!vsctx.globalState.get("azALDevTools.remETrig.removeTriggers");
        this._settings.removeSubscribers = !!vsctx.globalState.get("azALDevTools.remETrig.removeSubscribers");
        this._settings.ignoreComments = !!vsctx.globalState.get("azALDevTools.remETrig.ignoreComments");
        //set defaults
        if ((!this._settings.removeTriggers) &&
            (!this._settings.removeSubscribers)) {
            this._settings.removeTriggers = true;
            this._settings.removeSubscribers = true;
        }
    }
    saveState() {
        let vsctx = this._context.vscodeExtensionContext;
        vsctx.globalState.update("azALDevTools.remETrig.removeTriggers", !!this._settings.removeTriggers);
        vsctx.globalState.update("azALDevTools.remETrig.removeSubscribers", !!this._settings.removeSubscribers);
        vsctx.globalState.update("azALDevTools.remETrig.ignoreComments", !!this._settings.ignoreComments);
    }
    clearSettings() {
        this._settings.removeTriggers = false;
        this._settings.removeSubscribers = false;
        this._settings.ignoreComments = false;
    }
}
exports.RemoveEmptyTriggersModifier = RemoveEmptyTriggersModifier;
//# sourceMappingURL=removeEmptyTriggersModifier.js.map