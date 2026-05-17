'use strict';
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
exports.ALImageBrowser = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const baseWebViewEditor_1 = require("../webviews/baseWebViewEditor");
const stringHelper_1 = require("../tools/stringHelper");
const toolsGetImagesRequest_1 = require("../langserver/languageInformation/toolsGetImagesRequest");
class ALImageBrowser extends baseWebViewEditor_1.BaseWebViewEditor {
    _devToolsContext;
    _imagesType;
    _withActions;
    _imageStyleType;
    constructor(devToolsContext, caption, imagesType, withActions, imageStyleType) {
        super(devToolsContext.vscodeExtensionContext, caption);
        this._devToolsContext = devToolsContext;
        this._imagesType = imagesType;
        this._withActions = withActions;
        this._imageStyleType = imageStyleType;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'imagebrowser', 'imagebrowser.html');
    }
    getViewType() {
        return 'azALDevTools.ALActionImageBrowser';
    }
    onDocumentLoaded() {
        this.loadData();
    }
    async loadData() {
        let data = await this.getImageList();
        if (data)
            this.sendMessage({
                command: 'setData',
                data: data,
                withActions: this._withActions,
                imageStyleType: this._imageStyleType
            });
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message))
            return true;
        switch (message.command) {
            case 'copyname':
                this.copyName(message.name, message.withui);
                break;
            case 'copyaction':
                this.copyAction(message.name, message.withui);
                return true;
            case 'copypromotedaction':
                this.copyPromotedAction(message.name, message.withui);
                return true;
        }
        return false;
    }
    async copyName(name, withUI) {
        await vscode.env.clipboard.writeText(name);
        if (withUI)
            vscode.window.showInformationMessage('Image name has been copied to the clipboard');
    }
    async copyAction(name, withUI) {
        let eol = stringHelper_1.StringHelper.getDefaultEndOfLine(undefined);
        await vscode.env.clipboard.writeText('action(' + name + 'Action)' + eol +
            '{' + eol +
            '    ApplicationArea = All;' + eol +
            '    Image = ' + name + ';' + eol +
            '' + eol +
            '    trigger OnAction()' + eol +
            '    begin' + eol +
            '' + eol +
            '    end;' + eol +
            '}' + eol);
        if (withUI)
            vscode.window.showInformationMessage('Action code has been copied to the clipboard');
    }
    async copyPromotedAction(name, withUI) {
        let eol = stringHelper_1.StringHelper.getDefaultEndOfLine(undefined);
        await vscode.env.clipboard.writeText('action(' + name + 'Action)' + eol +
            '{' + eol +
            '    ApplicationArea = All;' + eol +
            '    Image = ' + name + ';' + eol +
            '    Promoted = true;' + eol +
            '    PromotedCategory = Process;' + eol +
            eol +
            '    trigger OnAction()' + eol +
            '    begin' + eol +
            eol +
            '    end;' + eol +
            '}' + eol);
        if (withUI)
            vscode.window.showInformationMessage('Promoted action code has been copied to the clipboard');
    }
    async getImageList() {
        return await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'Loading list of images.'
        }, async (progress) => {
            let response = await this._devToolsContext.toolsLangServerClient.getImages(new toolsGetImagesRequest_1.ToolsGetImagesRequest(this._imagesType));
            if ((response) && (response.images))
                return response.images;
            return [];
        });
    }
}
exports.ALImageBrowser = ALImageBrowser;
//# sourceMappingURL=alImageBrowser.js.map