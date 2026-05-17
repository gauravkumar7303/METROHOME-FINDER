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
exports.WithModifier = void 0;
const vscode = __importStar(require("vscode"));
const workspaceCommandSyntaxModifier_1 = require("./workspaceCommandSyntaxModifier");
class WithModifier extends workspaceCommandSyntaxModifier_1.WorkspaceCommandSyntaxModifier {
    constructor(context) {
        super(context, "Remove With", "removeWith");
    }
    async confirmRunForWorkspace() {
        if (this._context.alLangProxy.version.major < 6) {
            vscode.window.showErrorMessage("To remove WITH statements with the current AL project you have to be using Microsoft AL Extension version 6 or newer.");
            return false;
        }
        let confirmation = await vscode.window.showInformationMessage('Do you want to run this command for all files in the current project folder?', 'Yes', 'No');
        return (confirmation === 'Yes');
    }
}
exports.WithModifier = WithModifier;
//# sourceMappingURL=withModifier.js.map