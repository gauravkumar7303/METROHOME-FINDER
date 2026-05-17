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
exports.ToolsLangServerClient = void 0;
const vscode = __importStar(require("vscode"));
const cp = __importStar(require("child_process"));
const rpc = __importStar(require("vscode-jsonrpc/node"));
const toolsGetNextObjectIdRequest_1 = require("./symbolsinformation/toolsGetNextObjectIdRequest");
class ToolsLangServerClient {
    _context;
    _childProcess;
    _connection;
    _alExtensionPath;
    _alExtensionVersion;
    errorLogUri;
    constructor(context, alExtensionPath, alExtensionVersion) {
        this._context = context;
        this._childProcess = undefined;
        this._connection = undefined;
        this._alExtensionPath = alExtensionPath;
        this._alExtensionVersion = alExtensionVersion;
        this.errorLogUri = undefined;
        this.initialize();
    }
    dispose() {
        if (this._connection) {
            this.exit();
            this._connection.dispose();
            this._connection = undefined;
        }
    }
    initialize() {
        try {
            let os = require('os');
            let platform = os.platform();
            let langServerPath;
            //find binaries path
            if (this._alExtensionVersion.major <= 1) {
                langServerPath = this._context.asAbsolutePath("bin/netframeworknav2018/AZALDevToolsServer.NetFrameworkNav2018.exe");
                this.errorLogUri = vscode.Uri.file(this._context.asAbsolutePath("bin/netframeworknav2018/log.txt"));
            }
            else {
                langServerPath = this._context.asAbsolutePath("bin/netcore/" + platform + "/AZALDevToolsServer.NetCore");
                this.errorLogUri = vscode.Uri.file(this._context.asAbsolutePath("bin/netcore/" + platform + "/log.txt"));
                if ((platform === "darwin") || (platform === "linux")) {
                    let fs = require('fs');
                    fs.chmodSync(langServerPath, 0o755);
                }
            }
            //start child process
            this._childProcess = cp.spawn(langServerPath, [this._alExtensionPath]);
            if (this._childProcess) {
                let stdOutStream = this._childProcess.stdout;
                let stdInStream = this._childProcess.stdin;
                if ((stdOutStream != null) && (stdInStream != null)) {
                    this._connection = rpc.createMessageConnection(new rpc.StreamMessageReader(stdOutStream), new rpc.StreamMessageWriter(stdInStream));
                    this._connection.listen();
                }
            }
        }
        catch (e) {
        }
    }
    getALDocumentSymbols(params) {
        return this.sendRequest(params, 'al/documentsymbols');
    }
    getAppPackageSymbols(params) {
        return this.sendRequest(params, 'al/packagesymbols');
    }
    getProjectSymbols(params) {
        return this.sendRequest(params, 'al/projectsymbols');
    }
    getLibrarySymbolsDetails(params) {
        return this.sendRequest(params, 'al/librarysymbolsdetails');
    }
    closeSymbolsLibrary(params) {
        this.sendNotification(params, 'al/closesymbolslibrary');
    }
    getSyntaxTree(params) {
        return this.sendRequest(params, 'al/getsyntaxtree');
    }
    getSyntaxTreeSymbol(params) {
        return this.sendRequest(params, 'al/getsyntaxtreesymbol');
    }
    closeSyntaxTree(params) {
        this.sendNotification(params, 'al/closesyntaxtree');
    }
    //syntax tree
    getRawSyntaxTree(params) {
        return this.sendRequest(params, 'al/getrawsyntaxtree');
    }
    getRawSyntaxTreeSymbol(params) {
        return this.sendRequest(params, 'al/getrawsyntaxtreesymbol');
    }
    closeRawSyntaxTree(params) {
        this.sendNotification(params, 'al/closerawsyntaxtree');
    }
    getFullSyntaxTree(params, restoreParent) {
        return this.sendRequest(params, 'al/getfullsyntaxtree');
    }
    getCodeAnalyzersRules(params) {
        return this.sendRequest(params, 'al/getcodeanalyzersrules');
    }
    workspaceCommand(params) {
        return this.sendRequest(params, 'al/workspacecommand');
    }
    findDuplicateCode(params) {
        return this.sendRequest(params, 'al/findDuplicateCode');
    }
    //exit
    exit() {
        this.sendNotification({}, 'exit');
    }
    //symbol location
    getLibrarySymbolLocation(params) {
        return this.sendRequest(params, 'al/librarysymbollocation');
    }
    getProjectSymbolLocation(params) {
        return this.sendRequest(params, 'al/projectsymbollocation');
    }
    getALAppContent(params) {
        return this.sendRequest(params, 'al/getalappcontent');
    }
    //symbols information requests
    getObjectsList(params) {
        return this.sendRequest(params, 'al/getobjectslist');
    }
    getTablesList(params) {
        return this.sendRequest(params, 'al/gettableslist');
    }
    getCodeunitsList(params) {
        return this.sendRequest(params, 'al/getcodeunitslist');
    }
    getCodeunitMethodsList(params) {
        return this.sendRequest(params, 'al/getcodeunitmethodslist');
    }
    getEnumsList(params) {
        return this.sendRequest(params, 'al/getenumslist');
    }
    getInterfacesList(params) {
        return this.sendRequest(params, 'al/getinterfaceslist');
    }
    getInterfaceMethodsList(params) {
        return this.sendRequest(params, 'al/getinterfacemethodslist');
    }
    getPagesList(params) {
        return this.sendRequest(params, 'al/getpageslist');
    }
    getReportsList(params) {
        return this.sendRequest(params, 'al/getreportslist');
    }
    getQueriesList(params) {
        return this.sendRequest(params, 'al/getquerieslist');
    }
    getXmlPortsList(params) {
        return this.sendRequest(params, 'al/getxmlportslist');
    }
    getPermissionSetsList(params) {
        return this.sendRequest(params, 'al/getpermissionsetslist');
    }
    getTableFieldsList(params) {
        return this.sendRequest(params, 'al/gettablefieldslist');
    }
    getPageDetails(params) {
        return this.sendRequest(params, 'al/getpagedetails');
    }
    getXmlPortTableElementDetails(params) {
        return this.sendRequest(params, 'al/getxmlporttableelementdetails');
    }
    getReportDataItemDetails(params) {
        return this.sendRequest(params, 'al/getreportdataitemdetails');
    }
    getReportDetails(params) {
        return this.sendRequest(params, 'al/getreportdetails');
    }
    getQueryDataItemDetails(params) {
        return this.sendRequest(params, 'al/getquerydataitemdetails');
    }
    getProjectSettings(params) {
        return this.sendRequest(params, 'al/getprojectsettings');
    }
    getDependenciesList(params) {
        return this.sendRequest(params, 'al/getdependencieslist');
    }
    getPageFieldAvailableToolTips(params) {
        return this.sendRequest(params, 'al/getpagefieldtooltips');
    }
    getWarningDirectives(params) {
        return this.sendRequest(params, 'al/getwarningdirectives');
    }
    collectWorkspaceCodeActions(params) {
        return this.sendRequest(params, 'al/collectworkspacecodeactions');
    }
    getNewFileRequiredInterfaces(params) {
        return this.sendRequest(params, 'al/getnewfilerequiredinterfaces');
    }
    //next available object id
    async getNextObjectId(path, objectType) {
        let response = await this.sendRequest(new toolsGetNextObjectIdRequest_1.ToolsGetNextObjectIdRequest(path, objectType), 'al/getnextobjectid');
        if ((response) && (response.id)) {
            return response.id;
        }
        return 0;
    }
    //code completion and hover
    codeCompletion(params) {
        return this.sendRequest(params, 'al/codecompletion');
    }
    provideHover(params) {
        return this.sendRequest(params, 'al/hover');
    }
    provideReferences(params) {
        return this.sendRequest(params, 'al/references');
    }
    //language information
    getImages(params) {
        return this.sendRequest(params, "al/getimages");
    }
    getFileContent(params) {
        return this.sendRequest(params, 'al/getfilecontent');
    }
    //workspace and file notifications
    workspaceFolderChange(params) {
        this.sendNotification(params, 'ws/workspaceFoldersChange');
    }
    async documentOpen(params) {
        this.sendNotification(params, "ws/documentOpen");
    }
    async documentChange(params) {
        return this.sendRequest(params, "ws/documentContentChange");
    }
    async documentSave(params) {
        this.sendNotification(params, "ws/documentSave");
    }
    documentClose(params) {
        this.sendNotification(params, "ws/documentClose");
    }
    fileCreate(params) {
        this.sendNotification(params, "ws/fileCreate");
    }
    fileDelete(params) {
        this.sendNotification(params, "ws/fileDelete");
    }
    fileRename(params) {
        this.sendNotification(params, "ws/fileRename");
    }
    async fileSystemFileChange(params) {
        this.sendNotification(params, "ws/fsFileChange");
    }
    async fileSystemFileCreate(params) {
        this.sendNotification(params, "ws/fsFileCreate");
    }
    async fileSystemFileDelete(params) {
        this.sendNotification(params, "ws/fsFileDelete");
    }
    async configurationChange(params) {
        this.sendNotification(params, "ws/configurationChange");
    }
    //internal communication methods
    sendNotification(params, command) {
        try {
            if (!this._connection)
                return undefined;
            let reqType = new rpc.NotificationType(command);
            this._connection.sendNotification(reqType, params);
        }
        catch (e) {
        }
    }
    async sendRequest(params, command) {
        try {
            if (!this._connection)
                return undefined;
            let reqType = new rpc.RequestType(command);
            let val = await this._connection.sendRequest(reqType, params);
            return val;
        }
        catch (e) {
            return undefined;
        }
    }
    isEnabled() {
        if (this._connection)
            return true;
        return false;
    }
}
exports.ToolsLangServerClient = ToolsLangServerClient;
//# sourceMappingURL=toolsLangServerClient.js.map