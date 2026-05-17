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
exports.DevToolsExtensionContext = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const alLangServerProxy_1 = require("./allanguage/alLangServerProxy");
const toolsLangServerClient_1 = require("./langserver/toolsLangServerClient");
const azActiveDocumentSymbolsLibrary_1 = require("./symbollibraries/azActiveDocumentSymbolsLibrary");
const alObjectRunner_1 = require("./alObjectRunner");
const alSymbolsBrowser_1 = require("./alsymbolsbrowser/alSymbolsBrowser");
const alOutlineService_1 = require("./services/alOutlineService");
const alObjectWizardsService_1 = require("./services/alObjectWizardsService");
const alCompletionService_1 = require("./services/alCompletionService");
const alSymbolsTreeService_1 = require("./services/alSymbolsTreeService");
const codeAnalyzersService_1 = require("./services/codeAnalyzersService");
const alSymbolsService_1 = require("./services/alSymbolsService");
const alCodeTransformationService_1 = require("./services/alCodeTransformationService");
const ALCodeActionsService_1 = require("./services/ALCodeActionsService");
const editorsService_1 = require("./services/editorsService");
const workspaceChangeTrackingService_1 = require("./services/workspaceChangeTrackingService");
const diagnosticsService_1 = require("./services/diagnosticsService");
const alImagesService_1 = require("./services/alImagesService");
const duplicateCodeService_1 = require("./services/duplicateCodeService");
const warningDirectivesService_1 = require("./services/warningDirectivesService");
const hoverService_1 = require("./services/hoverService");
const referencesService_1 = require("./services/referencesService");
const idReservationService_1 = require("./services/idReservationService");
const alDecorationService_1 = require("./services/alDecorationService");
const gitClientService_1 = require("./services/gitClientService");
const ALBuildConfigurationService_1 = require("./configmanager/ALBuildConfigurationService");
class DevToolsExtensionContext {
    alLangProxy;
    vscodeExtensionContext;
    toolsLangServerClient;
    activeDocumentSymbols;
    objectRunner;
    alOutlineService;
    alSymbolsTreeService;
    alWizardsService;
    alCompletionService;
    codeAnalyzersService;
    symbolsService;
    alCodeTransformationService;
    alCodeActionsService;
    editorsService;
    workspaceChangeTrackingService;
    diagnosticsService;
    alImagesService;
    duplicateCodeService;
    warningDirectivesService;
    hoverService;
    referencesService;
    idReservationService;
    alDecorationService;
    gitService;
    buildConfigurationService;
    constructor(context) {
        this.alLangProxy = new alLangServerProxy_1.ALLangServerProxy();
        this.vscodeExtensionContext = context;
        let alExtensionPath = "";
        if (this.alLangProxy.extensionPath)
            alExtensionPath = this.alLangProxy.extensionPath;
        this.toolsLangServerClient = new toolsLangServerClient_1.ToolsLangServerClient(context, alExtensionPath, this.alLangProxy.version);
        this.activeDocumentSymbols = new azActiveDocumentSymbolsLibrary_1.AZActiveDocumentSymbolsLibrary(this);
        this.objectRunner = new alObjectRunner_1.ALObjectRunner(this);
        this.alOutlineService = new alOutlineService_1.ALOutlineService(this);
        this.alSymbolsTreeService = new alSymbolsTreeService_1.ALSymbolsTreeService(this);
        this.alWizardsService = new alObjectWizardsService_1.ALObjectWizardsService(this);
        this.alCompletionService = new alCompletionService_1.ALCompletionService(this);
        this.codeAnalyzersService = new codeAnalyzersService_1.CodeAnalyzersService(this);
        this.symbolsService = new alSymbolsService_1.ALSymbolsService(this);
        this.alCodeTransformationService = new alCodeTransformationService_1.ALCodeTransformationService(this);
        this.alCodeActionsService = new ALCodeActionsService_1.ALCodeActionsService(this);
        this.editorsService = new editorsService_1.EditorsService(this);
        this.workspaceChangeTrackingService = new workspaceChangeTrackingService_1.WorkspaceChangeTrackingService(this);
        this.diagnosticsService = new diagnosticsService_1.DiagnosticsService(this);
        this.alImagesService = new alImagesService_1.ALImagesService(this);
        this.duplicateCodeService = new duplicateCodeService_1.DuplicateCodeService(this);
        this.warningDirectivesService = new warningDirectivesService_1.WarningDirectivesService(this);
        this.hoverService = new hoverService_1.HoverService(this);
        this.referencesService = new referencesService_1.ReferencesService(this);
        this.idReservationService = new idReservationService_1.IdReservationService(this);
        this.alDecorationService = new alDecorationService_1.ALDecorationService(this);
        this.gitService = new gitClientService_1.GitClientService(this);
        this.buildConfigurationService = new ALBuildConfigurationService_1.ALBuildConfigurationService(this);
    }
    getUseSymbolsBrowser() {
        let useSymbolsBrowser = this.vscodeExtensionContext.globalState.get("azALDevTools.useSymbolsBrowser");
        if (useSymbolsBrowser)
            return useSymbolsBrowser;
        return false;
    }
    setUseSymbolsBrowser(newValue) {
        this.vscodeExtensionContext.globalState.update("azALDevTools.useSymbolsBrowser", newValue);
    }
    showSymbolsBrowser(library) {
        let symbolsBrowser = new alSymbolsBrowser_1.ALSymbolsBrowser(this, library);
        symbolsBrowser.show();
    }
    getImageUri(name, theme) {
        return vscode.Uri.file(this.vscodeExtensionContext.asAbsolutePath(path.join("resources", "images", theme, name)));
    }
    getLightImageUri(name) {
        return this.getImageUri(name, "light");
    }
    getDarkImageUri(name) {
        return this.getImageUri(name, "dark");
    }
    dispose() {
        this.toolsLangServerClient.dispose();
    }
}
exports.DevToolsExtensionContext = DevToolsExtensionContext;
//# sourceMappingURL=devToolsExtensionContext.js.map