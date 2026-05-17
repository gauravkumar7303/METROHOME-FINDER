"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppJsonSyntaxProvider = void 0;
const caRulesCollection_1 = require("../carulesviewer/caRulesCollection");
const syntaxProvider_1 = require("./syntaxProvider");
class AppJsonSyntaxProvider extends syntaxProvider_1.SyntaxProvider {
    constructor(newContext) {
        super(newContext, "/appJsonSyntax.json");
    }
    async provideTextDocumentContent(uri, token) {
        let rulesCollection = new caRulesCollection_1.CARulesCollection(this._context);
        await rulesCollection.loadRules();
        if ((rulesCollection.rules) && (rulesCollection.rules.length > 0)) {
            let ruleEnum = [];
            let ruleEnumDesc = [];
            let oneOf = [];
            for (let i = 0; i < rulesCollection.rules.length; i++) {
                var rule = rulesCollection.rules[i];
                if (rule.id) {
                    ruleEnum.push(rule.id);
                    if (rule.description)
                        ruleEnumDesc.push(rule.description);
                    else
                        ruleEnumDesc.push(rule.id);
                }
            }
            let syntax = {
                "$id": "AL Language Project File Syntax",
                "$schema": "http://json-schema.org/draft-07/schema",
                "description": "schema for an AL Language Project File",
                "type": "object",
                "properties": {
                    "suppressWarnings": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": ruleEnum,
                            "enumDescriptions": ruleEnumDesc
                        }
                    }
                }
            };
            return JSON.stringify(syntax);
        }
        return "";
    }
}
exports.AppJsonSyntaxProvider = AppJsonSyntaxProvider;
//# sourceMappingURL=appJsonSyntaxProvider.js.map