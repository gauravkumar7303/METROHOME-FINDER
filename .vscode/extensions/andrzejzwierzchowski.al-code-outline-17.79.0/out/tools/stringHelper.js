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
exports.StringHelper = void 0;
const vscode = __importStar(require("vscode"));
class StringHelper {
    static getDefaultEndOfLine(destUri) {
        let eolText = vscode.workspace.getConfiguration('files', destUri).get('eol');
        if ((eolText) && (eolText != 'auto'))
            return eolText;
        return (process.platform === 'win32' ? '\r\n' : '\n');
    }
    static emptyIfNotDef(value) {
        if (value !== undefined) {
            return value;
        }
        return "";
    }
    static equalStartLength(text1, text2) {
        let len1 = text1.length;
        let len2 = text2.length;
        let len = Math.min(len1, len2);
        for (let i = 0; i < len; i++) {
            if (text1.charAt(i) !== text2.charAt(i))
                return i;
        }
        return len;
    }
    static equalEndLength(text1, text2) {
        let len1 = text1.length;
        let len2 = text2.length;
        let t2diff = len2 - len1;
        for (let i = (len1 - 1); (i >= 0) && ((i + t2diff) >= 0); i--) {
            if (text1.charAt(i) !== text2.charAt(i + t2diff))
                return (len1 - i - 1);
        }
        return Math.min(len1, len2);
    }
    static defaultIfEmpty(value, defaultValue) {
        if ((value) && (value !== ""))
            return value;
        return defaultValue;
    }
}
exports.StringHelper = StringHelper;
//# sourceMappingURL=stringHelper.js.map