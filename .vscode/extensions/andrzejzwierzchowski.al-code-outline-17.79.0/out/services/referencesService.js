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
exports.ReferencesService = void 0;
const vscode = __importStar(require("vscode"));
const alReferencesProvider_1 = require("../editorextensions/alReferencesProvider");
const devToolsExtensionService_1 = require("./devToolsExtensionService");
class ReferencesService extends devToolsExtensionService_1.DevToolsExtensionService {
    _alReferencesProvider;
    constructor(context) {
        super(context);
        this._alReferencesProvider = new alReferencesProvider_1.ALReferencesProvider(context);
        vscode.languages.registerReferenceProvider('al', this._alReferencesProvider);
    }
}
exports.ReferencesService = ReferencesService;
//# sourceMappingURL=referencesService.js.map