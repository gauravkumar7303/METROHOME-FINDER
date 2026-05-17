"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxProvider = void 0;
class SyntaxProvider {
    name;
    _context;
    constructor(newContext, newName) {
        this._context = newContext;
        this.name = newName;
    }
    async provideTextDocumentContent(uri, token) {
        return "";
    }
}
exports.SyntaxProvider = SyntaxProvider;
//# sourceMappingURL=syntaxProvider.js.map