"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALConditionalCompilationSection = void 0;
class ALConditionalCompilationSection {
    start;
    end;
    childSections;
    parent;
    enabled;
    levelEnabled;
    constructor(parentSection, startLine) {
        this.start = startLine;
        this.end = -1;
        this.childSections = [];
        this.enabled = true;
        this.levelEnabled = true;
        this.parent = parentSection;
    }
}
exports.ALConditionalCompilationSection = ALConditionalCompilationSection;
//# sourceMappingURL=alConditionalCompilationSection.js.map