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
exports.ALSymbolsBrowser = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const azSymbolInformation_1 = require("../symbollibraries/azSymbolInformation");
const azSymbolKind_1 = require("../symbollibraries/azSymbolKind");
const alObjectBrowserItem_1 = require("./alObjectBrowserItem");
const baseWebViewEditor_1 = require("../webviews/baseWebViewEditor");
const alSymbolsBasedPageWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedPageWizard");
const alSymbolsBasedQueryWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedQueryWizard");
const alSymbolsBasedReportWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedReportWizard");
const alSymbolsBasedXmlPortWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedXmlPortWizard");
const alSymbolsBasedPageExtWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedPageExtWizard");
const alSymbolsBasedReportExtWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedReportExtWizard");
const alSymbolsBasedTableExtWizard_1 = require("../objectwizards/symbolwizards/alSymbolsBasedTableExtWizard");
const symbolsTreeView_1 = require("../symbolstreeview/symbolsTreeView");
const textEditorHelper_1 = require("../tools/textEditorHelper");
const stringHelper_1 = require("../tools/stringHelper");
const appFileTextContentProvider_1 = require("../editorextensions/appFileTextContentProvider");
const toolsGetProjectSymbolLocationRequest_1 = require("../langserver/toolsGetProjectSymbolLocationRequest");
/**
 * AL Symbols Browser
 * allows to browse symbols in a tree structure like in the Class Browser in Visual Studio
 * and in a list view like in old Dynamics Nav object browser
 */
class ALSymbolsBrowser extends baseWebViewEditor_1.BaseWebViewEditor {
    _library;
    _devToolsContext;
    _selectedObject;
    _showObjectIds;
    _treeViewMode;
    _itemsList;
    _showLibraries;
    constructor(devToolsContext, library) {
        super(devToolsContext.vscodeExtensionContext, library.displayName);
        this._devToolsContext = devToolsContext;
        this._library = library;
        this._treeViewMode = devToolsContext.getUseSymbolsBrowser();
        //tree view properties
        this._selectedObject = undefined;
        this._showObjectIds = false;
        //list view properties
        this._itemsList = [];
        this._showLibraries = false;
    }
    getHtmlContentPath() {
        if (this._treeViewMode)
            return path.join('htmlresources', 'alsymbolsbrowser', 'symbolsbrowser.html');
        return path.join('htmlresources', 'objectbrowser', 'objectbrowser.html');
    }
    getViewType() {
        return 'azALDevTools.ALSymbolsBrowser';
    }
    async onDocumentLoaded() {
        //load library
        await this._library.loadAsync(false);
        if (this._treeViewMode) {
            //send data to the tree web view
            this.updateTreeObjects();
        }
        else {
            //send data to the list web view
            this.updateListObjects();
        }
    }
    updateTreeObjects() {
        this.sendMessage({
            command: 'setData',
            data: this._library.rootSymbol
        });
    }
    updateListObjects() {
        this._itemsList = [];
        this._showLibraries = false;
        if (this._library.rootSymbol)
            this.collectListSymbols(this._library.rootSymbol, '');
        //send data to the web view
        this.sendMessage({
            command: 'setData',
            data: this._itemsList,
            showLibraries: this._showLibraries
        });
    }
    collectListSymbols(symbol, libraryName) {
        if (symbol.isALObject()) {
            this._itemsList.push(new alObjectBrowserItem_1.ALObjectBrowserItem(symbol.kind, symbol.id, symbol.name, libraryName, symbol.getPath()));
        }
        else if (symbol.childSymbols) {
            if (symbol.kind == azSymbolKind_1.AZSymbolKind.Package) {
                libraryName = symbol.name;
                if ((!this._showLibraries) && (this._itemsList.length > 0))
                    this._showLibraries = true;
            }
            for (let i = 0; i < symbol.childSymbols.length; i++) {
                symbol.childSymbols[i].parent = symbol;
                this.collectListSymbols(symbol.childSymbols[i], libraryName);
            }
        }
    }
    processWebViewMessage(message) {
        if (super.processWebViewMessage(message))
            return true;
        switch (message.command) {
            case 'definition':
                this.goToDefinition(message.path);
                return true;
            case 'localdefinition':
                this.goToLocalDefinition(message.path);
                return true;
            case 'shownewtab':
                this.showNewTab(message.path);
                break;
            case 'runinwebclient':
                this.runInWebClient(message.path);
                return true;
            case 'newcardpage':
                this.createPage(message.path, message.selpaths, "Card");
                return true;
            case 'newlistpage':
                this.createPage(message.path, message.selpaths, "List");
                return true;
            case 'newreport':
                this.createReport(message.path, message.selpaths);
                return true;
            case 'newxmlport':
                this.createXmlPort(message.path, message.selpaths);
                return true;
            case 'newquery':
                this.createQuery(message.path, message.selpaths);
                return true;
            case 'extendtable':
                this.createTableExt(message.path, message.selpaths);
                return true;
            case 'extendpage':
                this.createPageExt(message.path, message.selpaths);
                return true;
            case 'extendreport':
                this.createReportExt(message.path, message.selpaths);
                return true;
            case 'copysel':
                this.copySelected(message.path, message.selpaths);
                return true;
            case 'showlist':
                this.switchViewMode(false);
                break;
            case 'showTreeView':
                this.switchViewMode(true);
                break;
            case 'objselected':
                this.onObjectSelected(message.path);
                return true;
            case 'currRowChanged':
                this.updatePivotObjCommand(message.path);
                return true;
        }
        return false;
    }
    async getObjectsFromPath(selPaths, kind) {
        if (!selPaths)
            return undefined;
        let objList = await this._library.getSymbolsListByPathAsync(selPaths, kind);
        if (!objList)
            return undefined;
        if (objList.length > 100) {
            let action = await vscode.window.showWarningMessage(`You are about to run this command for ${selPaths.length} objects. Do you want to continue?`, { modal: true }, 'Yes', 'No');
            if (action !== 'Yes') {
                return undefined;
            }
        }
        return objList;
    }
    async copySelected(path, selPaths) {
        let eol = stringHelper_1.StringHelper.getDefaultEndOfLine(undefined);
        let symbolList = await this.getObjectsFromPath(selPaths, azSymbolKind_1.AZSymbolKind.AnyALObject);
        if (symbolList) {
            let objectsText = 'Type\tId\tName';
            for (let i = 0; i < symbolList.length; i++) {
                symbolList[i];
                objectsText += (eol +
                    symbolList[i].getObjectTypeName() + '\t' +
                    symbolList[i].id.toString() + '\t' +
                    symbolList[i].name);
            }
            vscode.env.clipboard.writeText(objectsText);
        }
    }
    async createPage(path, selPaths, pageType) {
        let symbolList = await this.getObjectsFromPath(selPaths, azSymbolKind_1.AZSymbolKind.TableObject);
        if (symbolList) {
            let builder = new alSymbolsBasedPageWizard_1.ALSymbolsBasedPageWizard(this._devToolsContext);
            await builder.showWizard(symbolList, pageType);
        }
    }
    async createQuery(path, selPaths) {
        let symbolList = await this.getObjectsFromPath(selPaths, azSymbolKind_1.AZSymbolKind.TableObject);
        if (symbolList) {
            let builder = new alSymbolsBasedQueryWizard_1.ALSymbolsBasedQueryWizard(this._devToolsContext);
            builder.showWizard(symbolList);
        }
    }
    async createReport(path, selPaths) {
        let symbolList = await this.getObjectsFromPath(selPaths, azSymbolKind_1.AZSymbolKind.TableObject);
        if (symbolList) {
            let builder = new alSymbolsBasedReportWizard_1.ALSymbolsBasedReportWizard(this._devToolsContext);
            builder.showWizard(symbolList);
        }
    }
    async createXmlPort(path, selPaths) {
        let symbolList = await this.getObjectsFromPath(selPaths, azSymbolKind_1.AZSymbolKind.TableObject);
        if (symbolList) {
            let builder = new alSymbolsBasedXmlPortWizard_1.ALSymbolsBasedXmlPortWizard(this._devToolsContext);
            builder.showWizard(symbolList);
        }
    }
    async createPageExt(path, selPaths) {
        let symbolList = await this.getObjectsFromPath(selPaths, azSymbolKind_1.AZSymbolKind.PageObject);
        if (symbolList) {
            let builder = new alSymbolsBasedPageExtWizard_1.ALSymbolsBasedPageExtWizard(this._devToolsContext);
            builder.showWizard(symbolList);
        }
    }
    async createReportExt(path, selPaths) {
        let symbolList = await this.getObjectsFromPath(selPaths, azSymbolKind_1.AZSymbolKind.ReportObject);
        if (symbolList) {
            let builder = new alSymbolsBasedReportExtWizard_1.ALSymbolsBasedReportExtWizard(this._devToolsContext);
            builder.showWizard(symbolList);
        }
    }
    async createTableExt(path, selPaths) {
        let symbolList = await this.getObjectsFromPath(selPaths, azSymbolKind_1.AZSymbolKind.TableObject);
        if (symbolList) {
            let builder = new alSymbolsBasedTableExtWizard_1.ALSymbolsBasedTableExtWizard(this._devToolsContext);
            builder.showWizard(symbolList);
        }
    }
    async showNewTab(path) {
        if (!path)
            return;
        let alSymbolList = await this._library.getSymbolsListByPathAsync([path], azSymbolKind_1.AZSymbolKind.AnyALObject);
        if ((alSymbolList) && (alSymbolList.length > 0)) {
            let symbolsTreeView = new symbolsTreeView_1.SymbolsTreeView(this._devToolsContext, 'lib://' + alSymbolList[0].fullName, undefined);
            symbolsTreeView.setSymbols(alSymbolList[0], alSymbolList[0].fullName);
            symbolsTreeView.show();
        }
    }
    async goToDefinition(path) {
        if (!path)
            return;
        let alSymbolList = await this._library.getSymbolsListByPathAsync([path], azSymbolKind_1.AZSymbolKind.AnyALObject);
        if ((alSymbolList) && (alSymbolList.length > 0)) {
            let preview = !vscode.workspace.getConfiguration('alOutline').get('openDefinitionInNewTab');
            let targetLocation = undefined;
            let alSymbol = alSymbolList[0];
            //try to find symbol location
            let workspaceFolder = undefined;
            let libraryUri = this._library.getUri();
            let libraryPath = undefined;
            if (libraryUri) {
                workspaceFolder = vscode.workspace.getWorkspaceFolder(libraryUri);
                libraryPath = libraryUri.fsPath;
            }
            if ((!workspaceFolder) && (vscode.workspace.workspaceFolders) && (vscode.workspace.workspaceFolders.length > 0)) {
                workspaceFolder = vscode.workspace.workspaceFolders[0];
            }
            //get location from extension language server
            if (workspaceFolder) {
                let projectSymbolResponse = await this._devToolsContext.toolsLangServerClient.getProjectSymbolLocation(new toolsGetProjectSymbolLocationRequest_1.ToolsGetProjectSymbolLocationRequest(workspaceFolder.uri.fsPath, libraryPath, alSymbol.kind.toString(), alSymbol.name));
                if ((projectSymbolResponse) && (projectSymbolResponse.location)) {
                    if (this.openALSymbolSourceLocation(projectSymbolResponse.location, workspaceFolder.name)) {
                        return;
                    }
                }
            }
            vscode.window.showErrorMessage('Object definition is not available.');
        }
    }
    async goToLocalDefinition(path) {
        if (!path)
            return;
        let location = await this._library.getSymbolLocationByPath(path);
        if (!location)
            return;
        this.openALSymbolSourceLocation(location, '');
        /*
        let preview = !vscode.workspace.getConfiguration('alOutline').get('openDefinitionInNewTab');
        let position: vscode.Position | undefined = undefined;
        if (location.range)
            position = new vscode.Position(location.range.start.line, location.range.start.character);

        if (location.schema == 'file')
            TextEditorHelper.openEditor(vscode.Uri.file(location.sourcePath), true, preview, position);
        else
            TextEditorHelper.openEditor(vscode.Uri.parse(AppFileTextContentProvider.scheme + ':' + location.sourcePath), true, preview, position);
        */
    }
    openALSymbolSourceLocation(location, workspaceFolderName) {
        if ((!location.schema) || (!location.sourcePath))
            return false;
        let preview = !vscode.workspace.getConfiguration('alOutline').get('openDefinitionInNewTab');
        let position = undefined;
        if (location.range)
            position = new vscode.Position(location.range.start.line, location.range.start.character);
        if (location.sourcePath) {
            if (location.schema == 'file') {
                textEditorHelper_1.TextEditorHelper.openEditor(vscode.Uri.file(location.sourcePath), true, preview, position);
                return true;
            }
            else if (location.schema == 'alapp') {
                textEditorHelper_1.TextEditorHelper.openEditor(vscode.Uri.parse(appFileTextContentProvider_1.AppFileTextContentProvider.scheme + ':' + location.sourcePath), true, preview, position);
                return true;
            }
            else if (location.schema == 'al-preview') {
                let alPreviewUri = vscode.Uri.parse('al-preview://allang/' + workspaceFolderName + '/' + encodeURIComponent(location.sourcePath));
                textEditorHelper_1.TextEditorHelper.openEditor(alPreviewUri, true, preview, position);
                return true;
            }
        }
        return false;
    }
    async runInWebClient(path) {
        if (!path)
            return;
        let alSymbolList = await this._library.getSymbolsListByPathAsync([path], azSymbolKind_1.AZSymbolKind.AnyALObject);
        if ((alSymbolList) && (alSymbolList.length > 0)) {
            this._devToolsContext.objectRunner.runSymbolAsync(alSymbolList[0]);
        }
    }
    onPanelClosed() {
        this._library.unloadAsync();
    }
    async updatePivotObjCommand(symbolPath) {
        let sourceId = this._library.getSourceId();
        let rootSymbol = azSymbolInformation_1.AZSymbolInformation.create(azSymbolKind_1.AZSymbolKind.Document, 'Symbol');
        if ((symbolPath) && (symbolPath.length > 0)) {
            let pathList = [symbolPath];
            let symbolList = await this._library.getSymbolsListByPathAsync(pathList, azSymbolKind_1.AZSymbolKind.AnyALObject);
            if ((symbolList) && (symbolList.length > 0)) {
                rootSymbol.addChildItem(symbolList[0]);
                sourceId = sourceId + '_' + symbolList[0].kind.toString() + '_' + symbolList[0].name;
            }
        }
        this._devToolsContext.activeDocumentSymbols.setRootSymbol(rootSymbol, sourceId);
    }
    async onObjectSelected(path) {
        if (!path)
            return;
        let symbolList = await this._library.getSymbolsListByPathAsync([path], azSymbolKind_1.AZSymbolKind.AnyALObject);
        if ((symbolList) && (symbolList.length > 0))
            this._selectedObject = symbolList[0];
        else
            this._selectedObject = undefined;
        if (this._selectedObject)
            this.sendMessage({
                command: 'setSelObjData',
                data: this._selectedObject
            });
    }
    switchViewMode(newTreeViewMode) {
        this._treeViewMode = newTreeViewMode;
        this._devToolsContext.setUseSymbolsBrowser(this._treeViewMode);
        this.resetViewView();
    }
}
exports.ALSymbolsBrowser = ALSymbolsBrowser;
//# sourceMappingURL=alSymbolsBrowser.js.map