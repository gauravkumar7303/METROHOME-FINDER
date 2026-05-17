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
exports.PageControlsCaptionsModifier = void 0;
const vscode = __importStar(require("vscode"));
const nameValueQuickPickItem_1 = require("../tools/nameValueQuickPickItem");
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class PageControlsCaptionsModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    _controlTypes;
    constructor(context) {
        super(context, "Add Page Control Captions", "addPageControlCaptions");
        this._controlTypes = {
            setActionsCaptions: false,
            setActionGroupsCaptions: false,
            setGroupsCaptions: false,
            setRepeatersCaptions: false,
            setPartsCaptions: false,
            setFieldsCaptions: false,
            setLabelsCaptions: false
        };
    }
    getParameters(uri) {
        let parameters = super.getParameters(uri);
        this.copySettings(parameters, this._controlTypes);
        parameters.sortProperties = this.sortPropertiesOnSave(uri);
        return parameters;
    }
    copySettings(dest, src) {
        if (!src)
            src = {};
        dest.setActionsCaptions = !!src.setActionsCaptions;
        dest.setActionGroupsCaptions = !!src.setActionGroupsCaptions;
        dest.setGroupsCaptions = !!src.setGroupsCaptions;
        dest.setRepeatersCaptions = !!src.setRepeatersCaptions;
        dest.setPartsCaptions = !!src.setPartsCaptions;
        dest.setFieldsCaptions = !!src.setFieldsCaptions;
        dest.setLabelsCaptions = !!src.setLabelsCaptions;
    }
    areSettingsEmpty(value) {
        return ((!value) || ((!value.setActionsCaptions) &&
            (!value.setActionGroupsCaptions) &&
            (!value.setGroupsCaptions) &&
            (!value.setRepeatersCaptions) &&
            (!value.setPartsCaptions) &&
            (!value.setFieldsCaptions) &&
            (!value.setLabelsCaptions)));
    }
    loadDefaultParameters(uri) {
        let defaultParameters = vscode.workspace.getConfiguration('alOutline', uri).get('defaultAddPageFieldCaptionsSettings');
        if (this.areSettingsEmpty(defaultParameters))
            return false;
        this.copySettings(this._controlTypes, defaultParameters);
        return true;
    }
    async askForParameters(uri) {
        this.loadState();
        let quickPickItems = [
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Page actions', 'setActionsCaptions', !!this._controlTypes.setActionsCaptions),
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Page action groups', 'setActionGroupsCaptions', !!this._controlTypes.setActionGroupsCaptions),
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Page groups', 'setGroupsCaptions', !!this._controlTypes.setGroupsCaptions),
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Page repeaters', 'setRepeatersCaptions', !!this._controlTypes.setRepeatersCaptions),
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Page parts', 'setPartsCaptions', !!this._controlTypes.setPartsCaptions),
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Page fields', 'setFieldsCaptions', !!this._controlTypes.setFieldsCaptions),
            new nameValueQuickPickItem_1.NameValueQuickPickItem('Page labels', 'setLabelsCaptions', !!this._controlTypes.setLabelsCaptions)
        ];
        let selectedValues = await vscode.window.showQuickPick(quickPickItems, { canPickMany: true, placeHolder: 'Select page controls to update' });
        if (!selectedValues)
            return false;
        let data = {};
        if (selectedValues) {
            for (let i = 0; i < selectedValues.length; i++) {
                data[selectedValues[i].value] = true;
            }
        }
        if (this.areSettingsEmpty(data))
            return false;
        this.copySettings(this._controlTypes, data);
        this.saveState();
        return true;
    }
    loadState() {
        this.clearControlTypes();
        let vsctx = this._context.vscodeExtensionContext;
        this._controlTypes.setActionsCaptions = !!vsctx.globalState.get("azALDevTools.setPgCap.setActionsCaptions");
        this._controlTypes.setActionGroupsCaptions = !!vsctx.globalState.get("azALDevTools.setPgCap.setActionGroupsCaptions");
        this._controlTypes.setGroupsCaptions = !!vsctx.globalState.get("azALDevTools.setPgCap.setGroupsCaptions");
        this._controlTypes.setRepeatersCaptions = !!vsctx.globalState.get("azALDevTools.setPgCap.setRepeatersCaptions");
        this._controlTypes.setPartsCaptions = !!vsctx.globalState.get("azALDevTools.setPgCap.setPartsCaptions");
        this._controlTypes.setFieldsCaptions = !!vsctx.globalState.get("azALDevTools.setPgCap.setFieldsCaptions");
        this._controlTypes.setLabelsCaptions = !!vsctx.globalState.get("azALDevTools.setPgCap.setLabelsCaptions");
        //set defaults
        if (this.areSettingsEmpty(this._controlTypes)) {
            this._controlTypes.setActionsCaptions = true;
            this._controlTypes.setActionGroupsCaptions = true;
            this._controlTypes.setGroupsCaptions = true;
            this._controlTypes.setRepeatersCaptions = true;
            this._controlTypes.setPartsCaptions = false;
            this._controlTypes.setFieldsCaptions = false;
            this._controlTypes.setLabelsCaptions = false;
        }
    }
    saveState() {
        let vsctx = this._context.vscodeExtensionContext;
        vsctx.globalState.update("azALDevTools.setPgCap.setActionsCaptions", this._controlTypes.setActionsCaptions);
        vsctx.globalState.update("azALDevTools.setPgCap.setActionGroupsCaptions", this._controlTypes.setActionGroupsCaptions);
        vsctx.globalState.update("azALDevTools.setPgCap.setGroupsCaptions", this._controlTypes.setGroupsCaptions);
        vsctx.globalState.update("azALDevTools.setPgCap.setRepeatersCaptions", this._controlTypes.setRepeatersCaptions);
        vsctx.globalState.update("azALDevTools.setPgCap.setPartsCaptions", this._controlTypes.setPartsCaptions);
        vsctx.globalState.update("azALDevTools.setPgCap.setFieldsCaptions", this._controlTypes.setFieldsCaptions);
        vsctx.globalState.update("azALDevTools.setPgCap.setLabelsCaptions", this._controlTypes.setLabelsCaptions);
    }
    clearControlTypes() {
        this._controlTypes.setActionsCaptions = false;
        this._controlTypes.setActionGroupsCaptions = false;
        this._controlTypes.setGroupsCaptions = false;
        this._controlTypes.setRepeatersCaptions = false;
        this._controlTypes.setPartsCaptions = false;
        this._controlTypes.setFieldsCaptions = false;
        this._controlTypes.setLabelsCaptions = false;
    }
}
exports.PageControlsCaptionsModifier = PageControlsCaptionsModifier;
//# sourceMappingURL=pageControlsCaptionsModifier.js.map