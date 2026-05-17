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
exports.FormEditor = void 0;
const path = __importStar(require("path"));
const textDocumentWebViewEditor_1 = require("../webviews/textDocumentWebViewEditor");
class FormEditor extends textDocumentWebViewEditor_1.TextDocumentWebViewEditor {
    _currentFields;
    constructor(devToolsContext, title) {
        super(devToolsContext, title);
        this._currentFields = undefined;
    }
    getHtmlContentPath() {
        return path.join('htmlresources', 'editors', 'formeditor', 'formeditor.html');
    }
    getViewType() {
        return 'azALDevTools.FormEditor';
    }
    onDocumentLoaded() {
        this.updateData(true);
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message))
            return true;
        switch (message.command) {
            case 'dataChanged':
                this.onDataChanged(message.data);
                return true;
        }
        return false;
    }
    onDataChanged(data) {
    }
    onTextDocumentChanged() {
        this.updateData(false);
    }
    updateData(withDef) {
        if (withDef)
            this._currentFields = this.getFieldsDefinition();
        try {
            let data = this.getDocumentData();
            if (withDef) {
                this.sendMessage({
                    command: 'setData',
                    fields: this._currentFields,
                    data: data
                });
            }
            else {
                this.sendMessage({
                    command: 'setData',
                    data: data
                });
            }
        }
        catch (e) {
            let errorMessage = "Cannot parse file content. Please open file in the text editor and fix all issues. Parser error: " +
                e.message;
            //set current fields firs
            if (withDef)
                this.sendMessage({
                    command: 'dataError',
                    fields: this._currentFields,
                    message: errorMessage
                });
            else
                this.sendMessage({
                    command: 'dataError',
                    message: errorMessage
                });
        }
    }
    getDocumentData() {
        return undefined;
    }
    getFieldsDefinition() {
        return undefined;
    }
}
exports.FormEditor = FormEditor;
//# sourceMappingURL=formEditor.js.map