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
exports.FileBuilder = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
const crsAlLangExtHelper_1 = require("../crsAlLangExtHelper");
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
const stringHelper_1 = require("../tools/stringHelper");
class FileBuilder {
    static async showFile(filePath) {
        try {
            let document = await vscode.workspace.openTextDocument(filePath);
            vscode.window.showTextDocument(document, {
                preview: false
            });
        }
        catch (err) {
            vscode.window.showErrorMessage(err.toString());
        }
    }
    static async showNewUntitledDocument(content) {
        try {
            let document = await vscode.workspace.openTextDocument({
                content: content,
                language: "al"
            });
            vscode.window.showTextDocument(document, {
                preview: false
            });
        }
        catch (err) {
            vscode.window.showErrorMessage(err);
        }
    }
    static async generateObjectFileInRelativeDir(content, fileName, relativeFileDir) {
        // Determine the project root directory.
        if ((!vscode.workspace.workspaceFolders) || (vscode.workspace.workspaceFolders.length == 0))
            return undefined;
        let workspaceFolder;
        if (vscode.workspace.workspaceFolders.length == 1)
            workspaceFolder = vscode.workspace.workspaceFolders[0];
        else {
            workspaceFolder = await vscode.window.showWorkspaceFolderPick();
        }
        if (!workspaceFolder || workspaceFolder.uri.scheme !== 'file')
            return undefined;
        // Determine the directory to place the files in; create the directory if it does not exist yet.
        const baseFileDir = workspaceFolder.uri.fsPath;
        let newFileDirectory;
        if (relativeFileDir)
            newFileDirectory = path.join(baseFileDir, relativeFileDir);
        else
            newFileDirectory = baseFileDir;
        if (relativeFileDir) {
            try {
                if (!fs.existsSync(newFileDirectory)) {
                    this.mkdirRecursiveSync(baseFileDir, relativeFileDir);
                }
            }
            catch (err) {
                vscode.window.showErrorMessage('Could not create the path due to the following error: ' + err);
                return undefined;
            }
        }
        // Determine the file path for the new file to generate. Do not overwrite the file if it already exists.
        const newFilePath = path.join(newFileDirectory, fileName);
        const fileAlreadyExists = await this.fileExists(newFilePath);
        if (!fileAlreadyExists) {
            try {
                fs.appendFileSync(newFilePath, content);
            }
            catch (e) {
                vscode.window.showErrorMessage('Cannot create the AL file, please check if you selected correct output directory and your "CRS.FileNamePattern" setting. Error: ' + e.message);
                return undefined;
            }
        }
        return newFilePath;
    }
    static generateObjectFileInDir(dirPath, fileName, content) {
        try {
            let parsedPath = path.parse(fileName);
            let newFilePath = path.join(dirPath, fileName);
            let fileIndex = 0;
            while (fs.existsSync(newFilePath)) {
                fileIndex++;
                fileName = parsedPath.name + ' ' + fileIndex.toString() + parsedPath.ext;
                newFilePath = path.join(dirPath, fileName);
            }
            this.mkdirFullPathRecursiveSync(dirPath);
            fs.appendFileSync(newFilePath, content);
            return newFilePath;
        }
        catch (e) {
            vscode.window.showErrorMessage('Cannot create the AL file, please check if you selected correct output directory and your "CRS.FileNamePattern" setting. Error: ' + e.message);
            return undefined;
        }
    }
    static mkdirFullPathRecursiveSync(destPath) {
        if (fs.existsSync(destPath))
            return;
        let parsedPath = path.parse(destPath);
        if (parsedPath.dir)
            this.mkdirFullPathRecursiveSync(parsedPath.dir);
        fs.mkdirSync(destPath);
    }
    static mkdirRecursiveSync(baseDir, relativeDir) {
        relativeDir.split(/[\/\\]/g).reduce((prevDirPath, dirToCreate) => {
            const curDirPathToCreate = path.resolve(baseDir, prevDirPath, dirToCreate);
            try {
                fs.mkdirSync(curDirPathToCreate);
            }
            catch (e) {
                if (e.code !== 'EEXIST') {
                    throw e;
                }
            }
            return curDirPathToCreate;
        }, '');
    }
    static fileExists(path) {
        return new Promise((resolve, reject) => {
            fs.exists(path, exists => {
                resolve(exists);
            });
        });
    }
    //#region Object / File Pattern
    static SymbolKindToCrsName(symbolKind) {
        switch (symbolKind) {
            case azSymbolKind_1.AZSymbolKind.TableObject: return 'table';
            case azSymbolKind_1.AZSymbolKind.CodeunitObject: return 'codeunit';
            case azSymbolKind_1.AZSymbolKind.PageObject: return 'page';
            case azSymbolKind_1.AZSymbolKind.ReportObject: return 'report';
            case azSymbolKind_1.AZSymbolKind.QueryObject: return 'query';
            case azSymbolKind_1.AZSymbolKind.XmlPortObject: return 'xmlport';
            case azSymbolKind_1.AZSymbolKind.TableExtensionObject: return 'tableextension';
            case azSymbolKind_1.AZSymbolKind.PageExtensionObject: return 'pageextension';
            case azSymbolKind_1.AZSymbolKind.ControlAddInObject: return 'controladdin';
            case azSymbolKind_1.AZSymbolKind.ProfileObject: return 'profile';
            case azSymbolKind_1.AZSymbolKind.PageCustomizationObject: return 'pagecustomization';
            case azSymbolKind_1.AZSymbolKind.EnumType: return 'enum';
            case azSymbolKind_1.AZSymbolKind.DotNetPackage: return 'dotnetpackage';
            case azSymbolKind_1.AZSymbolKind.EnumExtensionType: return 'enumextension';
            case azSymbolKind_1.AZSymbolKind.Interface: return 'interface';
            case azSymbolKind_1.AZSymbolKind.ReportExtensionObject: return 'reportextension';
            case azSymbolKind_1.AZSymbolKind.PermissionSet: return 'permissionset';
            case azSymbolKind_1.AZSymbolKind.PermissionSetExtension: return 'permissionsetextension';
            case azSymbolKind_1.AZSymbolKind.Entitlement: return 'entitlement';
        }
        return '';
    }
    static SymbolKindToCamelCaseName(symbolKind) {
        switch (symbolKind) {
            case azSymbolKind_1.AZSymbolKind.TableObject: return 'Table';
            case azSymbolKind_1.AZSymbolKind.CodeunitObject: return 'Codeunit';
            case azSymbolKind_1.AZSymbolKind.PageObject: return 'Page';
            case azSymbolKind_1.AZSymbolKind.ReportObject: return 'Report';
            case azSymbolKind_1.AZSymbolKind.QueryObject: return 'Query';
            case azSymbolKind_1.AZSymbolKind.XmlPortObject: return 'XmlPort';
            case azSymbolKind_1.AZSymbolKind.TableExtensionObject: return 'TableExtension';
            case azSymbolKind_1.AZSymbolKind.PageExtensionObject: return 'PageExtension';
            case azSymbolKind_1.AZSymbolKind.ControlAddInObject: return 'ControlAddIn';
            case azSymbolKind_1.AZSymbolKind.ProfileObject: return 'Profile';
            case azSymbolKind_1.AZSymbolKind.PageCustomizationObject: return 'PageCustomization';
            case azSymbolKind_1.AZSymbolKind.EnumType: return 'Enum';
            case azSymbolKind_1.AZSymbolKind.DotNetPackage: return 'DotNetPackage';
            case azSymbolKind_1.AZSymbolKind.EnumExtensionType: return 'EnumExtension';
            case azSymbolKind_1.AZSymbolKind.Interface: return 'Interface';
            case azSymbolKind_1.AZSymbolKind.ReportExtensionObject: return 'ReportExtension';
            case azSymbolKind_1.AZSymbolKind.PermissionSet: return 'PermissionSet';
            case azSymbolKind_1.AZSymbolKind.PermissionSetExtension: return 'PermissionSetExtension';
            case azSymbolKind_1.AZSymbolKind.Entitlement: return 'Entitlement';
        }
        return '';
    }
    static getAutoGenerateFiles() {
        return vscode.workspace.getConfiguration('alOutline').get('autoGenerateFiles');
    }
    static getPromptForObjectName() {
        return vscode.workspace.getConfiguration('alOutline').get('promptForObjectName');
    }
    static checkCrsFileNamePatternRequired() {
        // If files are automatically generated AND no file naming pattern is available, then give an error that the file name pattern setting needs to be added.
        if (FileBuilder.getAutoGenerateFiles() && !FileBuilder.hasCrsFileNamePattern()) {
            vscode.window.showErrorMessage('File name pattern for new objects has not been specified in the "CRS.FileNamePattern" setting. Please add this setting to your VS Code workspace or user settings.');
            return false;
        }
        return true;
    }
    static checkCrsExtensionFileNamePatternRequired() {
        // If files are automatically generated AND no extension file naming pattern is available, then give an error that the extension file name pattern setting needs to be added.
        if (FileBuilder.getAutoGenerateFiles() && !FileBuilder.hasCrsExtensionFileNamePattern()) {
            vscode.window.showErrorMessage('File name pattern for extension objects has not been specified in the "CRS.FileNamePatternExtensions" setting. Please add this setting to your VS Code workspace or user settings.');
            return false;
        }
        return true;
    }
    static checkCrsExtensionObjectNamePatternRequired(multipleObjects) {
        // When multiple objects are generated, a prompt for the extension object name is not shown, so we need a pattern -> if not available, then this setting needs to be set first.
        if (multipleObjects && !FileBuilder.hasCrsExtensionObjectNamePattern()) {
            vscode.window.showErrorMessage('Extension object name pattern has not been specified in the "CRS.ExtensionObjectNamePattern" setting. Please add this setting to your VS Code workspace or user settings.');
            return false;
        }
        // When a single object is generated, the name can either come from a pattern or from the user via a prompt -> if both are unavailable/disabled, then either of these settings need to be added/enabled.
        else if (!multipleObjects && !FileBuilder.hasCrsExtensionObjectNamePattern() && !FileBuilder.getPromptForObjectName()) {
            vscode.window.showErrorMessage('The "CRS.ExtensionObjectNamePattern" setting is undefined and the "alOutline.promptForObjectName" setting is disabled. Please update your VS Code workspace or user settings.');
            return false;
        }
        return true;
    }
    static hasCrsFileNamePattern() {
        let patternText = vscode.workspace.getConfiguration('CRS', null).get('FileNamePattern');
        if (!patternText)
            return false;
        return true;
    }
    static hasCrsExtensionFileNamePattern() {
        let patternText = vscode.workspace.getConfiguration('CRS', null).get('FileNamePatternExtensions');
        if (!patternText)
            return false;
        return true;
    }
    static hasCrsExtensionObjectNamePattern() {
        let patternText = vscode.workspace.getConfiguration('CRS', null).get('ExtensionObjectNamePattern');
        if (!patternText)
            return false;
        return true;
    }
    static async getPatternGeneratedFullObjectFileName(objectType, objectId, objectName) {
        let crsLangExt = await crsAlLangExtHelper_1.CRSALLangExtHelper.GetCrsAlLangExt();
        if ((crsLangExt) && (this.hasCrsFileNamePattern()))
            return crsLangExt.ObjectNamesApi.GetObjectFileName(this.SymbolKindToCrsName(objectType), objectId.toString(), objectName);
        return objectName + '.al';
    }
    static async getPatternGeneratedExtensionObjectName(extensionType, extensionId, baseSymbolInfo) {
        let crsLangExt = await crsAlLangExtHelper_1.CRSALLangExtHelper.GetCrsAlLangExt();
        if ((crsLangExt) && (this.hasCrsExtensionObjectNamePattern()))
            return await crsLangExt.ObjectNamesApi.GetObjectExtensionName(this.SymbolKindToCrsName(extensionType), extensionId.toString(), '', this.getObjectIdFromSymbolInfo(baseSymbolInfo).toString(), this.getObjectNameFromSymbolInfo(baseSymbolInfo));
        return '';
    }
    static async getPatternGeneratedExtensionObjectFileName(extensionType, extensionId, extensionObjectName, baseSymbolInfo) {
        let crsLangExt = await crsAlLangExtHelper_1.CRSALLangExtHelper.GetCrsAlLangExt();
        if ((crsLangExt) && (this.hasCrsExtensionFileNamePattern()))
            return await crsLangExt.ObjectNamesApi.GetObjectExtensionFileName(this.SymbolKindToCrsName(extensionType), extensionId.toString(), extensionObjectName, this.getObjectIdFromSymbolInfo(baseSymbolInfo).toString(), this.getObjectNameFromSymbolInfo(baseSymbolInfo));
        return extensionObjectName + '.al';
    }
    static async getPatternGeneratedRelativeFilePath(objectType) {
        let typeName = this.getObjectTypeFromSymbolInfo(objectType);
        let typeNameCC = this.SymbolKindToCamelCaseName(objectType);
        let shortTypeName = '';
        let output = stringHelper_1.StringHelper.emptyIfNotDef(vscode.workspace.getConfiguration('alOutline').get('autoGenerateFileDirectory'));
        let crsLangExt = await crsAlLangExtHelper_1.CRSALLangExtHelper.GetCrsAlLangExt();
        if (crsLangExt)
            shortTypeName = crsLangExt.ObjectNamesApi.GetBestPracticeAbbreviatedObjectType(this.SymbolKindToCrsName(objectType));
        output = this.replacePattern(output, '<ObjectTypeLC>', typeName);
        output = this.replacePattern(output, '<ObjectType>', typeNameCC);
        output = this.replacePattern(output, '<ObjectTypeShort>', shortTypeName);
        return output;
    }
    static getObjectIdFromSymbolInfo(alSymbolInfo) {
        return alSymbolInfo.id;
    }
    static getObjectNameFromSymbolInfo(alSymbolInfo) {
        return this.stripNonAlphaNumericCharacters(alSymbolInfo.name);
    }
    static getObjectTypeFromSymbolInfo(alSymbolKind) {
        //return ALSymbolKind[alSymbolKind];
        return this.SymbolKindToCrsName(alSymbolKind);
    }
    static replacePattern(name, pattern, replaceWith) {
        return name.replace(new RegExp(this.escapeRegExpInPattern(pattern), 'g'), replaceWith);
    }
    /**
    * Escapes any regex operators/characters in a string.
    *
    * For further reference, please see [this](https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex) StackOverflow page.
    *
    * @param {string} name The string in which to escape all regex characters.
    * @returns The input string with any regex characters escaped.
    */
    static escapeRegExpInPattern(name) {
        return name.replace(/([.*+?^${}()|\[\]\/\\=!:])/g, "\\$1");
    }
    /**
     * Removes any characters that are not in the alphabet (\[A-Za-z\]), are numbers (\[0-9\]), or the underscore character ('_').
     *
     * @param {string} name The string from which to strip characters.
     * @returns The input string with any non-alphameric characters removed.
     */
    static stripNonAlphaNumericCharacters(name) {
        return name.replace(/\W/g, "");
    }
}
exports.FileBuilder = FileBuilder;
//# sourceMappingURL=fileBuilder.js.map