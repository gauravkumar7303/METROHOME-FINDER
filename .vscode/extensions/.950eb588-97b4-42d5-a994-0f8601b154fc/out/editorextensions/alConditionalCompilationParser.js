"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALConditionalCompilationParser = void 0;
const alConditionalCompilationSection_1 = require("./alConditionalCompilationSection");
const alLineWordReader_1 = require("../allanguage/alLineWordReader");
class ALConditionalCompilationParser {
    projectDirectives;
    constructor(directives) {
        this.projectDirectives = directives;
    }
    parseDocument(document) {
        let sections = [];
        let active = undefined;
        let mlComment = false;
        let wordReader = new alLineWordReader_1.ALLineWordReader();
        let directives = [];
        if (this.projectDirectives) {
            for (let i = 0; i < this.projectDirectives.length; i++) {
                directives.push(this.projectDirectives[i]);
            }
        }
        //parse document and collect conditional compilation areas
        for (let i = 0; i < document.lineCount; i++) {
            wordReader.setLine(document.lineAt(i).text.trim());
            let word = wordReader.nextWord();
            if (word) {
                if (word === "#if") {
                    let newSection = new alConditionalCompilationSection_1.ALConditionalCompilationSection(active, i);
                    newSection.enabled = this.parseCondition(wordReader, directives);
                    newSection.levelEnabled = newSection.enabled;
                    if (active) {
                        active.childSections.push(newSection);
                    }
                    else {
                        sections.push(newSection);
                    }
                    active = newSection;
                }
                else if (word === "#elif") {
                    if (active) {
                        active.end = i;
                        let newSection = new alConditionalCompilationSection_1.ALConditionalCompilationSection(active.parent, i);
                        newSection.enabled = (!active.levelEnabled) && (this.parseCondition(wordReader, directives));
                        newSection.levelEnabled = active.levelEnabled || newSection.enabled;
                        if (active.parent) {
                            active.parent.childSections.push(newSection);
                        }
                        else {
                            sections.push(newSection);
                        }
                        active = newSection;
                    }
                }
                else if (word === "#else") {
                    if (active) {
                        active.end = i;
                        let newSection = new alConditionalCompilationSection_1.ALConditionalCompilationSection(active.parent, i);
                        newSection.enabled = !active.levelEnabled;
                        newSection.levelEnabled = true;
                        if (active.parent) {
                            active.parent.childSections.push(newSection);
                        }
                        else {
                            sections.push(newSection);
                        }
                        active = newSection;
                    }
                }
                else if (word === "#endif") {
                    if (active) {
                        active.end = i;
                        active = active.parent;
                    }
                }
                else if (word === "#define") {
                    while (!wordReader.isEOL()) {
                        let defineWord = wordReader.nextWord();
                        if (defineWord)
                            directives.push(defineWord);
                    }
                }
                else if (word === "#undef") {
                    while (!wordReader.isEOL()) {
                        let undefWord = wordReader.nextWord();
                        if (undefWord) {
                            let index = directives.indexOf(undefWord);
                            if (index >= 0)
                                directives.splice(index, 1);
                        }
                    }
                }
                else {
                    wordReader.readToEnd();
                }
            }
        }
        return sections;
    }
    parseCondition(wordReader, directives) {
        let start = 0;
        let jscondition = "";
        while (!wordReader.isEOL()) {
            let word = wordReader.nextWord();
            if (!word)
                break;
            if (word === 'and')
                jscondition += '&&';
            else if (word === 'or')
                jscondition += '||';
            else if (word === 'not')
                jscondition += '!';
            else if ((word === '(') || (word === ')'))
                jscondition += word;
            else if (directives.indexOf(word) >= 0)
                jscondition += 'true';
            else
                jscondition += 'false';
        }
        try {
            let val = eval(jscondition);
            return !!val;
        }
        catch (e) {
            return false;
        }
    }
}
exports.ALConditionalCompilationParser = ALConditionalCompilationParser;
//# sourceMappingURL=alConditionalCompilationParser.js.map