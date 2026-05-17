"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALBaseServerSideLibrary = void 0;
const azSymbolsLibrary_1 = require("./azSymbolsLibrary");
const azSymbolInformation_1 = require("./azSymbolInformation");
const toolsLibrarySymbolsDetailsRequest_1 = require("../langserver/toolsLibrarySymbolsDetailsRequest");
const toolsCloseSymbolsLibraryRequest_1 = require("../langserver/toolsCloseSymbolsLibraryRequest");
const toolsGetLibrarySymbolLocationRequest_1 = require("../langserver/toolsGetLibrarySymbolLocationRequest");
class ALBaseServerSideLibrary extends azSymbolsLibrary_1.AZSymbolsLibrary {
    _context;
    _libraryId;
    constructor(context) {
        super();
        this._context = context;
        this._libraryId = 0;
    }
    async getSymbolsListByPathAsync(pathList, kind) {
        let data = await this._context.toolsLangServerClient.getLibrarySymbolsDetails(new toolsLibrarySymbolsDetailsRequest_1.ToolsLibrarySymbolsDetailsRequest(this._libraryId, kind, pathList));
        let symbolList = [];
        if ((data) && (data.symbols) && (data.symbols.length > 0)) {
            for (let i = 0; i < data.symbols.length; i++) {
                let symbol = azSymbolInformation_1.AZSymbolInformation.fromAny(data.symbols[i]);
                if (symbol) {
                    symbol.updateTree(true, this._twoWayTree);
                    symbolList.push(symbol);
                }
            }
        }
        return symbolList;
    }
    async getSymbolLocationByPath(symbolPath) {
        let data = await this._context.toolsLangServerClient.getLibrarySymbolLocation(new toolsGetLibrarySymbolLocationRequest_1.ToolsGetLibrarySymbolLocationRequest(this._libraryId, symbolPath));
        if (data)
            return data.location;
        return undefined;
    }
    async unloadAsync() {
        this._context.toolsLangServerClient.closeSymbolsLibrary(new toolsCloseSymbolsLibraryRequest_1.ToolsCloseSymbolsLibraryRequest(this._libraryId));
    }
}
exports.ALBaseServerSideLibrary = ALBaseServerSideLibrary;
//# sourceMappingURL=alBaseServerSideLibrary.js.map