"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextRange = void 0;
const textPosition_1 = require("./textPosition");
class TextRange {
    start;
    end;
    isEmpty;
    isSingleLine;
    constructor() {
        this.isEmpty = true;
        this.isSingleLine = true;
        this.start = new textPosition_1.TextPosition();
        this.end = new textPosition_1.TextPosition();
    }
    static fromAny(source) {
        let val = new TextRange();
        if (source.start)
            val.start = textPosition_1.TextPosition.fromAny(source.start);
        if (source.end)
            val.end = textPosition_1.TextPosition.fromAny(source.end);
        if (source.isEmpty)
            val.isEmpty = true;
        if (source.isSingleLine)
            val.isSingleLine = true;
        return val;
    }
    intersectVsRange(range) {
        return ((this.start.compareVsPosition(range.end) <= 0) &&
            (this.end.compareVsPosition(range.start) >= 0));
    }
    equalsVsRange(range) {
        return ((this.start.character == range.start.character) && (this.start.line == range.start.line) &&
            (this.end.character == range.end.character) && (this.end.line == range.end.line));
    }
    insideVsRange(range) {
        return ((this.start.compareVsPosition(range.start) <= 0) &&
            (this.end.compareVsPosition(range.end) >= 0));
    }
}
exports.TextRange = TextRange;
//# sourceMappingURL=textRange.js.map