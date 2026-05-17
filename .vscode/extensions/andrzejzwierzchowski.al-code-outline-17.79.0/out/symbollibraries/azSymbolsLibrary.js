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
exports.AZSymbolsLibrary = void 0;
const vscode = __importStar(require("vscode"));
const azSymbolInformation_1 = require("./azSymbolInformation");
const azSymbolKind_1 = require("./azSymbolKind");
class AZSymbolsLibrary {
    displayName;
    name;
    rootSymbol;
    showObjectIds;
    _twoWayTree;
    _sourceId;
    _onSymbolsChanged = new vscode.EventEmitter();
    onSymbolsChanged = this._onSymbolsChanged.event;
    constructor() {
        this.showObjectIds = false;
        this.displayName = '';
        this.name = '';
        this.rootSymbol = undefined;
        this._twoWayTree = false;
        this._sourceId = undefined;
    }
    async loadAsync(forceReload) {
        let loaded = await this.loadInternalAsync(forceReload);
        if (loaded)
            this.updateObjectList();
        if ((loaded) && (this._onSymbolsChanged))
            this._onSymbolsChanged.fire(this);
        return loaded;
    }
    loadFromAny(source) {
        if (source)
            this.rootSymbol = azSymbolInformation_1.AZSymbolInformation.fromAny(source);
        else
            this.rootSymbol = azSymbolInformation_1.AZSymbolInformation.create(azSymbolKind_1.AZSymbolKind.Document, this.displayName);
        this.updateObjectList();
        if (this._onSymbolsChanged)
            this._onSymbolsChanged.fire(this);
    }
    setRootSymbol(symbol, sourceId) {
        this.rootSymbol = symbol;
        this._sourceId = sourceId;
        if (this._onSymbolsChanged)
            this._onSymbolsChanged.fire(this);
    }
    async loadInternalAsync(forceReload) {
        return false;
    }
    async unloadAsync() {
    }
    clear() {
        this.displayName = '';
        this.name = '';
        this.clearSymbols();
    }
    clearSymbols() {
        this.rootSymbol = undefined;
    }
    updateObjectList() {
        if (this.rootSymbol) {
            this.rootSymbol.updateTree(true, this._twoWayTree);
        }
    }
    async getSymbolsListByPathAsync(pathList, kind) {
        let symbolList = [];
        for (let i = 0; i < pathList.length; i++) {
            let symbol = this.getSymbolByPath(pathList[i]);
            if ((symbol) && ((kind == azSymbolKind_1.AZSymbolKind.Undefined) || (symbol.kind == kind) || ((kind == azSymbolKind_1.AZSymbolKind.AnyALObject) && (symbol.isALObject()))))
                symbolList.push(symbol);
        }
        return symbolList;
    }
    getSymbolByPath(path) {
        if (this.rootSymbol)
            return this.getSymbolByPathWithRoot(this.rootSymbol, path);
        return undefined;
    }
    getSymbolByPathWithRoot(root, path) {
        if ((this.rootSymbol) && (root) && (path) && (path.length > 0)) {
            let symbol = this.rootSymbol;
            for (let i = path.length - 1; i >= 0; i--) {
                if ((!symbol.childSymbols) || (path[i] >= symbol.childSymbols.length))
                    return undefined;
                if (path[i] == -1)
                    symbol = this.rootSymbol;
                else
                    symbol = symbol.childSymbols[path[i]];
            }
            return symbol;
        }
        return undefined;
    }
    //#region Symbols search
    findNextSymbol(line) {
        if ((this.rootSymbol) && (this.rootSymbol.childSymbols)) {
            for (let i = 0; i < this.rootSymbol.childSymbols.length; i++) {
                let found = this.findNextSymbolInt(this.rootSymbol.childSymbols[i], line);
                if (found)
                    return found;
            }
        }
        return undefined;
    }
    findNextSymbolInt(symbol, line) {
        if ((symbol.range) && (symbol.range.start.line <= line) && (symbol.range.end.line >= line)) {
            if ((symbol.selectionRange) && (symbol.selectionRange.start.line >= line))
                return symbol;
            if (symbol.childSymbols) {
                for (let i = 0; i < symbol.childSymbols.length; i++) {
                    let found = this.findNextSymbolInt(symbol.childSymbols[i], line);
                    if (found)
                        return found;
                }
            }
        }
        return undefined;
    }
    findSymbolInRange(range) {
        if (!this.rootSymbol)
            return undefined;
        return this.findSymbolInRangeInt(this.rootSymbol, range, undefined);
    }
    findSymbolsInsideRange(range, kind, list) {
        if (this.rootSymbol)
            this.findSymbolsInsideRangeInt(this.rootSymbol, range, kind, list);
    }
    findALObjectsInsideRange(range, list) {
        if (this.rootSymbol)
            this.findALObjectsInsideRangeInt(this.rootSymbol, range, list);
    }
    findSymbolPathInRange(range) {
        if ((range) && (this.rootSymbol)) {
            let symbolsPath = [];
            this.findSymbolInRangeInt(this.rootSymbol, range, symbolsPath);
            if (symbolsPath.length > 0)
                return symbolsPath;
        }
        return undefined;
    }
    findSymbolPathInSelectionRange(range) {
        if ((range) && (this.rootSymbol)) {
            let symbolsPath = [];
            this.findSymbolInSelectionRangeInt(this.rootSymbol, range, symbolsPath);
            if (symbolsPath.length > 0)
                return symbolsPath;
        }
        return undefined;
    }
    findSymbolsInsideRangeInt(symbol, range, kind, list) {
        if ((symbol.kind == kind) && (symbol.range) && (symbol.range.insideVsRange(range)))
            list.push(symbol);
        if (symbol.childSymbols)
            for (let i = 0; i < symbol.childSymbols.length; i++)
                this.findSymbolsInsideRangeInt(symbol.childSymbols[i], range, kind, list);
    }
    findALObjectsInsideRangeInt(symbol, range, list) {
        if (symbol.isALObject()) {
            if ((symbol.range) && (symbol.range.insideVsRange(range)))
                list.push(symbol);
        }
        else {
            if (symbol.childSymbols)
                for (let i = 0; i < symbol.childSymbols.length; i++)
                    this.findALObjectsInsideRangeInt(symbol.childSymbols[i], range, list);
        }
    }
    findSymbolInRangeInt(symbol, range, symbolsPath) {
        let found = undefined;
        if ((symbol.range) && (symbol.range.intersectVsRange(range)))
            found = symbol;
        if (symbol.childSymbols) {
            for (let i = 0; i < symbol.childSymbols.length; i++) {
                let foundChild = this.findSymbolInRangeInt(symbol.childSymbols[i], range, symbolsPath);
                if (foundChild) {
                    if (symbolsPath)
                        symbolsPath.push(i);
                    return foundChild;
                }
            }
        }
        return found;
    }
    findSymbolInSelectionRangeInt(symbol, range, symbolsPath) {
        let found = undefined;
        if (symbol.selectionRange) {
            if (symbol.selectionRange.intersectVsRange(range))
                found = symbol;
        }
        else if ((symbol.range) && (symbol.range.intersectVsRange(range)))
            found = symbol;
        if (symbol.childSymbols) {
            for (let i = 0; i < symbol.childSymbols.length; i++) {
                let foundChild = this.findSymbolInSelectionRangeInt(symbol.childSymbols[i], range, symbolsPath);
                if (foundChild) {
                    if (symbolsPath)
                        symbolsPath.push(i);
                    return foundChild;
                }
            }
        }
        return found;
    }
    //#region
    async getSymbolLocationByPath(symbolPath) {
        return undefined;
    }
    getUri() {
        return undefined;
    }
    getSourceId() {
        let uri = this.getUri();
        if (uri)
            return uri.toString();
        if (this._sourceId)
            return this._sourceId;
        return 'undefined';
    }
}
exports.AZSymbolsLibrary = AZSymbolsLibrary;
//# sourceMappingURL=azSymbolsLibrary.js.map