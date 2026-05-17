"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextPosition = void 0;
class TextPosition {
    line;
    character;
    constructor() {
        this.line = 0;
        this.character = 0;
    }
    static fromAny(source) {
        let val = new TextPosition();
        if (source.line)
            val.line = source.line;
        if (source.character)
            val.character = source.character;
        return val;
    }
    compareVsPosition(position) {
        if (position.line == this.line)
            return (this.character - position.character);
        else
            return (this.line - position.line);
    }
    set(newLine, newCharacter) {
        this.line = newLine;
        this.character = newCharacter;
    }
    compare(position) {
        if (this.line > position.line)
            return 1;
        if (this.line < position.line)
            return -1;
        if (this.character > position.character)
            return 1;
        if (this.character < position.character)
            return -1;
        return 0;
    }
}
exports.TextPosition = TextPosition;
//# sourceMappingURL=textPosition.js.map