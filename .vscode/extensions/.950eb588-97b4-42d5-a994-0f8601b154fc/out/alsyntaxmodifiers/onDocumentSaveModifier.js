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
exports.OnDocumentSaveModifier = void 0;
const vscode = __importStar(require("vscode"));
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class OnDocumentSaveModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    _commandsList;
    constructor(context) {
        super(context, "Run Multiple Commands", "runMultiple");
        this._showProgress = false;
        this._context = context;
        this._commandsList = undefined;
    }
    getCommandsList(uri) {
        this._commandsList = '';
        let actionsList = vscode.workspace.getConfiguration('alOutline', uri).get('codeActionsOnSave');
        if ((actionsList) && (actionsList.length > 0)) {
            for (let i = 0; i < actionsList.length; i++) {
                let name = actionsList[i];
                name = name.substring(0, 1).toLowerCase() + name.substring(1);
                if (i > 0)
                    this._commandsList = this._commandsList + ',' + name;
                else
                    this._commandsList = name;
            }
        }
    }
    getParameters(uri) {
        let config = vscode.workspace.getConfiguration('alOutline', uri);
        return {
            commandsList: this._commandsList,
            skipFormatting: 'true',
            variablesSortMode: config.get('variablesSortMode')
        };
    }
    async runForDocument(document, range, withUI) {
        this.getCommandsList(document.uri);
        if ((this._commandsList) && (this._commandsList != ''))
            await super.runForDocument(document, range, withUI);
    }
}
exports.OnDocumentSaveModifier = OnDocumentSaveModifier;
//# sourceMappingURL=onDocumentSaveModifier.js.map