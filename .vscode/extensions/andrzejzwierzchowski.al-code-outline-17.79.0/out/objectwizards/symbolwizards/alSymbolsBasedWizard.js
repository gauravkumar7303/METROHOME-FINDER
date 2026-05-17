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
exports.ALSymbolsBasedWizard = void 0;
const vscode = __importStar(require("vscode"));
const fileBuilder_1 = require("../fileBuilder");
class ALSymbolsBasedWizard {
    _toolsExtensionContext;
    constructor(context) {
        this._toolsExtensionContext = context;
    }
    async showNewDocument(content, fileName, relativeFileDir) {
        let autoGenerateFile = this.shouldAutoGenerateFiles();
        if (autoGenerateFile && fileName) {
            this.showNewGeneratedFile(content, fileName, relativeFileDir);
        }
        else {
            fileBuilder_1.FileBuilder.showNewUntitledDocument(content);
        }
    }
    async showNewGeneratedFile(content, fileName, relativeFileDir) {
        let autoShowDocument = vscode.workspace.getConfiguration('alOutline').get('autoShowFiles');
        let filePath = await fileBuilder_1.FileBuilder.generateObjectFileInRelativeDir(content, fileName, relativeFileDir);
        if ((filePath) && (autoShowDocument))
            fileBuilder_1.FileBuilder.showFile(filePath);
    }
    async getObjectId(destPath, objectType, promptText, defaultObjectId) {
        let uri;
        if (destPath)
            uri = vscode.Uri.file(destPath);
        let objectId = await this._toolsExtensionContext.idReservationService.suggestObjectId(undefined, uri, objectType);
        if (objectId == 0)
            objectId = defaultObjectId;
        if (this.shouldPromptForObjectId()) {
            let objectIdString = await this.promptForObjectId(promptText, objectId.toString());
            if (!objectIdString)
                return -1;
            objectId = Number(objectIdString);
            if (isNaN(objectId))
                return -1;
        }
        return objectId;
    }
    async getObjectName(promptText, defaultObjectName) {
        let objectName = defaultObjectName;
        if (this.shouldPromptForObjectName())
            objectName = await this.promptForObjectName(promptText, objectName);
        if (!objectName)
            return objectName;
        if (this.shouldStripCharacters())
            objectName = fileBuilder_1.FileBuilder.stripNonAlphaNumericCharacters(objectName);
        return objectName;
    }
    async getRelativeFileDir(objectType) {
        let relativeFileDir = await fileBuilder_1.FileBuilder.getPatternGeneratedRelativeFilePath(objectType);
        if (this.shouldPromptForFileDir() && this.shouldAutoGenerateFiles()) {
            relativeFileDir = await this.promptForFileDir('Please specify a directory, relative to the root, to create the new file(s) in.', relativeFileDir);
        }
        return relativeFileDir;
    }
    //#region UI functions
    promptForObjectId(promptText, defaultObjectId) {
        return vscode.window.showInputBox({
            value: defaultObjectId,
            prompt: promptText,
            validateInput: (text) => {
                let objectId = Number(text);
                if (isNaN(objectId)) {
                    return 'Only numbers are allowed for object IDs.';
                }
                else {
                    return undefined;
                }
            }
        });
    }
    promptForObjectName(promptText, defaultObjectName) {
        return vscode.window.showInputBox({
            value: defaultObjectName,
            prompt: promptText
        });
    }
    promptForFileDir(promptText, defaultFilePath) {
        return vscode.window.showInputBox({
            value: defaultFilePath,
            prompt: promptText,
            ignoreFocusOut: true
        });
    }
    //#endregion
    //#region Setting Helper Functions
    getBoolSetting(name) {
        //convert undefined to false
        if (vscode.workspace.getConfiguration('alOutline').get(name))
            return true;
        return false;
    }
    shouldPromptForObjectId() {
        return this.getBoolSetting('promptForObjectId');
    }
    shouldPromptForObjectName() {
        return this.getBoolSetting('promptForObjectName');
    }
    shouldPromptForFileDir() {
        return this.getBoolSetting('promptForFilePath');
    }
    shouldStripCharacters() {
        return this.getBoolSetting('stripNonAlphanumericCharactersFromObjectNames');
    }
    shouldAutoGenerateFiles() {
        return this.getBoolSetting('autoGenerateFiles');
    }
}
exports.ALSymbolsBasedWizard = ALSymbolsBasedWizard;
//# sourceMappingURL=alSymbolsBasedWizard.js.map