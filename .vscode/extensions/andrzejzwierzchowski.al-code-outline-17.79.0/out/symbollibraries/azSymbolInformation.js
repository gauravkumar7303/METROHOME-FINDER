"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AZSymbolInformation = void 0;
const azSymbolAccessModifier_1 = require("./azSymbolAccessModifier");
const azSymbolKind_1 = require("./azSymbolKind");
const textRange_1 = require("./textRange");
class AZSymbolInformation {
    id;
    idx;
    usings;
    namespaceName;
    name;
    subtype;
    elementsubtype;
    fullName;
    kind;
    icon;
    childSymbols;
    //full symbol range from the begining to the end of symbol definition
    range;
    //smaller symbol range, usual symbol name
    selectionRange;
    contentRange;
    tokensRange;
    containsDiagnostics;
    source;
    extends;
    format;
    access;
    parent;
    constructor() {
        this.id = 0;
        this.idx = -1;
        this.name = '';
        this.fullName = '';
        this.subtype = undefined;
        this.elementsubtype = undefined;
        this.icon = '';
        this.kind = azSymbolKind_1.AZSymbolKind.Undefined;
        this.childSymbols = undefined;
        this.range = undefined;
        this.selectionRange = undefined;
        this.contentRange = undefined;
        this.tokensRange = undefined;
        this.source = undefined;
        this.extends = undefined;
        this.format = undefined;
        this.parent = undefined;
        this.access = undefined;
        this.namespaceName = undefined;
        this.usings = undefined;
    }
    static create(newKind, newName) {
        let symbol = new AZSymbolInformation();
        symbol.kind = newKind;
        symbol.name = newName;
        symbol.fullName = symbol.name;
        return symbol;
    }
    static createWithId(newId, newKind, newName) {
        let symbol = AZSymbolInformation.create(newKind, newName);
        symbol.id = newId;
        return symbol;
    }
    static fromAny(source) {
        let obj = new AZSymbolInformation();
        if (source.id)
            obj.id = source.id;
        if (source.name)
            obj.name = source.name;
        if (source.fullName)
            obj.fullName = source.fullName;
        if (source.kind)
            obj.kind = source.kind;
        if (source.range)
            obj.range = textRange_1.TextRange.fromAny(source.range);
        if (source.selectionRange)
            obj.selectionRange = textRange_1.TextRange.fromAny(source.selectionRange);
        if (source.contentRange)
            obj.contentRange = textRange_1.TextRange.fromAny(source.contentRange);
        if (source.tokensRange)
            obj.tokensRange = textRange_1.TextRange.fromAny(source.tokensRange);
        if (source.source)
            obj.source = source.source;
        if (source.extends)
            obj.extends = source.extends;
        if (source.subtype)
            obj.subtype = source.subtype;
        if (source.elementsubtype)
            obj.elementsubtype = source.elementsubtype;
        if (source.containsDiagnostics)
            obj.containsDiagnostics = source.containsDiagnostics;
        if (source.format)
            obj.format = source.format;
        if (source.access !== undefined)
            obj.access = source.access;
        if (source.namespaceName)
            obj.namespaceName = source.namespaceName;
        if (source.usings)
            obj.usings = source.usings;
        if (source.childSymbols)
            for (let i = 0; i < source.childSymbols.length; i++)
                obj.addChildItem(AZSymbolInformation.fromAny(source.childSymbols[i]));
        return obj;
    }
    isALObject() {
        return ((this.kind == azSymbolKind_1.AZSymbolKind.TableObject) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.CodeunitObject) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.PageObject) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.ReportObject) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.QueryObject) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.XmlPortObject) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.TableExtensionObject) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.PageExtensionObject) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.ControlAddInObject) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.EnumType) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.EnumExtensionType) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.DotNetPackage) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.ProfileObject) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.PageCustomizationObject) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.Interface) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.ReportExtensionObject) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.PermissionSet) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.PermissionSetExtension) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.Entitlement));
    }
    isTrigger() {
        return (this.kind === azSymbolKind_1.AZSymbolKind.TriggerDeclaration);
    }
    isMethod() {
        return ((this.kind == azSymbolKind_1.AZSymbolKind.TestDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.ConfirmHandlerDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.FilterPageHandlerDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.HyperlinkHandlerDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.MessageHandlerDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.ModalPageHandlerDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.PageHandlerDeclaration) ||
            //(this.kind == AZSymbolKind.RecallNotificationHandler) || // is missing
            (this.kind == azSymbolKind_1.AZSymbolKind.ReportHandlerDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.RequestPageHandlerDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.SendNotificationHandlerDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.SessionSettingsHandlerDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.StrMenuHandlerDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.MethodDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.LocalMethodDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.ProtectedMethodDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.InternalMethodDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.EventSubscriberDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.EventDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.InternalEventDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.BusinessEventDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.ExternalBusinessEventDeclaration) ||
            (this.kind == azSymbolKind_1.AZSymbolKind.IntegrationEventDeclaration));
    }
    createSharedCopy() {
        let symbol = this.createCopy(false);
        symbol.childSymbols = this.childSymbols;
        return symbol;
    }
    createCopy(copyChildren) {
        let obj = new AZSymbolInformation();
        obj.id = this.id;
        obj.name = this.name;
        obj.fullName = this.fullName;
        obj.kind = this.kind;
        obj.icon = this.icon;
        obj.idx = this.idx;
        if ((copyChildren) && (this.childSymbols))
            for (let i = 0; i < this.childSymbols.length; i++)
                obj.addChildItem(this.childSymbols[i].createCopy(copyChildren));
        return obj;
    }
    toObjectTree() {
        let obj = this.createCopy(false);
        if (!this.isALObject()) {
            if (this.childSymbols)
                for (let i = 0; i < this.childSymbols.length; i++) {
                    obj.addChildItem(this.childSymbols[i].toObjectTree());
                }
        }
        return obj;
    }
    addChildItem(childItem) {
        if (childItem) {
            if (!this.childSymbols)
                this.childSymbols = [];
            this.childSymbols.push(childItem);
        }
    }
    updateTree(updateChildItems, twoWayTree) {
        //update icon
        this.icon = this.getIconName();
        //update child items
        if ((updateChildItems) && (this.childSymbols)) {
            for (let i = 0; i < this.childSymbols.length; i++) {
                this.childSymbols[i].idx = i;
                if (twoWayTree)
                    this.childSymbols[i].parent = this;
                this.childSymbols[i].updateTree(true, twoWayTree);
            }
        }
    }
    getIconName() {
        switch (this.kind) {
            case azSymbolKind_1.AZSymbolKind.Class: return 'class';
            case azSymbolKind_1.AZSymbolKind.Package: return 'module';
            case azSymbolKind_1.AZSymbolKind.SymbolGroup: return 'module';
            case azSymbolKind_1.AZSymbolKind.Undefined: return 'undefined';
            case azSymbolKind_1.AZSymbolKind.TableObject: return 'table';
            case azSymbolKind_1.AZSymbolKind.CodeunitObject: return 'codeunit';
            case azSymbolKind_1.AZSymbolKind.PageObject: return 'page';
            case azSymbolKind_1.AZSymbolKind.ReportObject: return 'report';
            case azSymbolKind_1.AZSymbolKind.QueryObject: return 'query';
            case azSymbolKind_1.AZSymbolKind.XmlPortObject: return 'xmlport';
            case azSymbolKind_1.AZSymbolKind.TableExtensionObject: return 'tableextension';
            case azSymbolKind_1.AZSymbolKind.PageExtensionObject: return 'pageextension';
            case azSymbolKind_1.AZSymbolKind.ControlAddInObject: return 'controladdin';
            case azSymbolKind_1.AZSymbolKind.ProfileObject: return 'profile';
            case azSymbolKind_1.AZSymbolKind.PageCustomizationObject: return 'pagecustomization';
            case azSymbolKind_1.AZSymbolKind.EnumType: return 'enum';
            case azSymbolKind_1.AZSymbolKind.DotNetPackage: return 'dotnetlib';
            case azSymbolKind_1.AZSymbolKind.ReportExtensionObject: return 'report';
            case azSymbolKind_1.AZSymbolKind.PermissionSet: return 'profile';
            case azSymbolKind_1.AZSymbolKind.PermissionSetExtension: return 'profile';
            case azSymbolKind_1.AZSymbolKind.Entitlement: return 'profile';
            case azSymbolKind_1.AZSymbolKind.Interface: return 'interface';
            case azSymbolKind_1.AZSymbolKind.Property: return 'property';
            case azSymbolKind_1.AZSymbolKind.VariableDeclaration:
                if (this.access === azSymbolAccessModifier_1.AZSymbolAccessModifier.Protected)
                    return 'variableprotected';
                return 'variable';
            case azSymbolKind_1.AZSymbolKind.VariableDeclarationName:
                if (this.access === azSymbolAccessModifier_1.AZSymbolAccessModifier.Protected)
                    return 'variableprotected';
                return 'variable';
            case azSymbolKind_1.AZSymbolKind.Constant: return 'constant';
            case azSymbolKind_1.AZSymbolKind.Parameter: return 'parameter';
            case azSymbolKind_1.AZSymbolKind.VarSection: return 'variablelist';
            case azSymbolKind_1.AZSymbolKind.GlobalVarSection:
                if (this.access === azSymbolAccessModifier_1.AZSymbolAccessModifier.Protected)
                    return 'variablelistprotected';
                return 'variablelist';
            case azSymbolKind_1.AZSymbolKind.MethodDeclaration: return 'method';
            case azSymbolKind_1.AZSymbolKind.LocalMethodDeclaration: return 'methodprivate';
            case azSymbolKind_1.AZSymbolKind.ProtectedMethodDeclaration: return 'methodprotected';
            case azSymbolKind_1.AZSymbolKind.InternalMethodDeclaration: return 'methodinternal';
            case azSymbolKind_1.AZSymbolKind.TriggerDeclaration: return 'trigger';
            case azSymbolKind_1.AZSymbolKind.Region: return 'region';
            case azSymbolKind_1.AZSymbolKind.ParameterList: return 'parameterlist';
            case azSymbolKind_1.AZSymbolKind.PropertyList: return 'propertieslist';
            //events
            case azSymbolKind_1.AZSymbolKind.IntegrationEventDeclaration: return 'integrationevent';
            case azSymbolKind_1.AZSymbolKind.InternalEventDeclaration: return 'integrationevent';
            case azSymbolKind_1.AZSymbolKind.BusinessEventDeclaration: return 'businessevent';
            case azSymbolKind_1.AZSymbolKind.ExternalBusinessEventDeclaration: return 'businessevent';
            case azSymbolKind_1.AZSymbolKind.EventSubscriberDeclaration: return 'eventsubscriber';
            //tests
            case azSymbolKind_1.AZSymbolKind.TestDeclaration: return 'test';
            case azSymbolKind_1.AZSymbolKind.ConfirmHandlerDeclaration: return 'testcontroller';
            case azSymbolKind_1.AZSymbolKind.FilterPageHandlerDeclaration: return 'testcontroller';
            case azSymbolKind_1.AZSymbolKind.HyperlinkHandlerDeclaration: return 'testcontroller';
            case azSymbolKind_1.AZSymbolKind.MessageHandlerDeclaration: return 'testcontroller';
            case azSymbolKind_1.AZSymbolKind.ModalPageHandlerDeclaration: return 'testcontroller';
            case azSymbolKind_1.AZSymbolKind.PageHandlerDeclaration: return 'testcontroller';
            case azSymbolKind_1.AZSymbolKind.ReportHandlerDeclaration: return 'testcontroller';
            case azSymbolKind_1.AZSymbolKind.RequestPageHandlerDeclaration: return 'testcontroller';
            case azSymbolKind_1.AZSymbolKind.SendNotificationHandlerDeclaration: return 'testcontroller';
            case azSymbolKind_1.AZSymbolKind.SessionSettingsHandlerDeclaration: return 'testcontroller';
            case azSymbolKind_1.AZSymbolKind.StrMenuHandlerDeclaration: return 'testcontroller';
            case azSymbolKind_1.AZSymbolKind.Field:
                if (this.subtype == 'ObsoletePending')
                    return 'fieldpending';
                if (this.subtype == 'ObsoleteRemoved')
                    return 'fieldobsolete';
                if (this.subtype == "Disabled")
                    return "fielddisabled";
                return 'field';
            case azSymbolKind_1.AZSymbolKind.PrimaryKey: return 'primarykey';
            case azSymbolKind_1.AZSymbolKind.Key: return 'key';
            case azSymbolKind_1.AZSymbolKind.FieldGroup: return 'fieldgroup';
            case azSymbolKind_1.AZSymbolKind.PageArea: return 'group';
            case azSymbolKind_1.AZSymbolKind.PageGroup: return 'group';
            case azSymbolKind_1.AZSymbolKind.PageRepeater: return 'repeater';
            case azSymbolKind_1.AZSymbolKind.PagePart: return 'pagepart';
            case azSymbolKind_1.AZSymbolKind.PageChartPart: return 'chartpart';
            case azSymbolKind_1.AZSymbolKind.PageSystemPart: return 'systempart';
            case azSymbolKind_1.AZSymbolKind.PageLayout: return 'pagelayout';
            case azSymbolKind_1.AZSymbolKind.PageActionList: return 'pageactions';
            case azSymbolKind_1.AZSymbolKind.PageLabel: return 'label';
            case azSymbolKind_1.AZSymbolKind.PageActionGroup: return 'group';
            case azSymbolKind_1.AZSymbolKind.PageActionArea: return 'group';
            case azSymbolKind_1.AZSymbolKind.PageAction: return 'action';
            case azSymbolKind_1.AZSymbolKind.EnumValue: return 'enumval';
            case azSymbolKind_1.AZSymbolKind.EnumExtensionType: return 'enumext';
            case azSymbolKind_1.AZSymbolKind.DotNetAssembly: return 'dotnetasm';
            case azSymbolKind_1.AZSymbolKind.DotNetTypeDeclaration: return 'dotnetclass';
            case azSymbolKind_1.AZSymbolKind.PageField: return 'field';
            case azSymbolKind_1.AZSymbolKind.FieldModification: return 'field';
            case azSymbolKind_1.AZSymbolKind.EventDeclaration: return 'event';
            case azSymbolKind_1.AZSymbolKind.EventTriggerDeclaration: return 'trigger';
            case azSymbolKind_1.AZSymbolKind.XmlPortSchema: return 'codeunit';
            case azSymbolKind_1.AZSymbolKind.XmlPortTableElement: return 'table';
            case azSymbolKind_1.AZSymbolKind.XmlPortFieldElement: return 'variable';
            case azSymbolKind_1.AZSymbolKind.XmlPortTextElement: return 'variable';
            case azSymbolKind_1.AZSymbolKind.XmlPortFieldAttribute: return 'parameter';
            case azSymbolKind_1.AZSymbolKind.XmlPortTextAttribute: return 'parameter';
            case azSymbolKind_1.AZSymbolKind.RequestPage: return 'page';
            //reports
            case azSymbolKind_1.AZSymbolKind.ReportDataSetSection: return 'codeunit';
            case azSymbolKind_1.AZSymbolKind.ReportLabelsSection: return 'codeunit';
            case azSymbolKind_1.AZSymbolKind.ReportDataItem: return 'table';
            case azSymbolKind_1.AZSymbolKind.ReportColumn: return 'field';
            case azSymbolKind_1.AZSymbolKind.ReportLabel: return 'variable';
            case azSymbolKind_1.AZSymbolKind.ReportLabelMultilanguage: return 'variable';
            //queries
            case azSymbolKind_1.AZSymbolKind.QueryElements: return 'codeunit';
            case azSymbolKind_1.AZSymbolKind.QueryDataItem: return 'table';
            case azSymbolKind_1.AZSymbolKind.QueryColumn: return 'field';
            case azSymbolKind_1.AZSymbolKind.QueryFilter: return 'parameter';
            //groups                       
            case azSymbolKind_1.AZSymbolKind.KeyList:
            case azSymbolKind_1.AZSymbolKind.FieldList:
            case azSymbolKind_1.AZSymbolKind.FieldGroupList:
            case azSymbolKind_1.AZSymbolKind.FieldExtensionList:
            case azSymbolKind_1.AZSymbolKind.PageViewList:
            case azSymbolKind_1.AZSymbolKind.GroupActionList:
            case azSymbolKind_1.AZSymbolKind.PageExtensionViewList:
            case azSymbolKind_1.AZSymbolKind.PageExtensionActionList:
                return 'codeunit';
        }
        return 'undefined';
    }
    collectObjectSymbols(outList) {
        if (this.isALObject())
            outList.push(this);
        else if (this.childSymbols)
            for (let i = 0; i < this.childSymbols.length; i++)
                this.childSymbols[i].collectObjectSymbols(outList);
    }
    collectChildSymbols(symbolKind, includeAllLevels, outList) {
        if (this.childSymbols) {
            for (let i = 0; i < this.childSymbols.length; i++) {
                if (this.childSymbols[i].kind == symbolKind)
                    outList.push(this.childSymbols[i]);
                if (includeAllLevels)
                    this.childSymbols[i].collectChildSymbols(symbolKind, includeAllLevels, outList);
            }
        }
    }
    collectChildSymbolsByKindList(symbolKindList, includeAllLevels, outList) {
        if (this.childSymbols) {
            for (let i = 0; i < this.childSymbols.length; i++) {
                if (symbolKindList.indexOf(this.childSymbols[i].kind) >= 0)
                    outList.push(this.childSymbols[i]);
                if (includeAllLevels)
                    this.childSymbols[i].collectChildSymbolsByKindList(symbolKindList, includeAllLevels, outList);
            }
        }
    }
    collectChildSymbolsByName(findName, includeAllLevels, outList) {
        if (this.childSymbols) {
            for (let i = 0; i < this.childSymbols.length; i++) {
                if (this.childSymbols[i].name == findName)
                    outList.push(this.childSymbols[i]);
                if (includeAllLevels)
                    this.childSymbols[i].collectChildSymbolsByName(findName, includeAllLevels, outList);
            }
        }
    }
    findFirstSymbolByKind(symbolKind) {
        if (this.kind == symbolKind)
            return this;
        let symbol;
        if (this.childSymbols) {
            for (let i = 0; i < this.childSymbols.length; i++) {
                symbol = this.childSymbols[i].findFirstSymbolByKind(symbolKind);
                if (symbol)
                    return symbol;
            }
        }
        return undefined;
    }
    findFirstObjectSymbol() {
        if (this.isALObject())
            return this;
        let symbol;
        if (this.childSymbols) {
            for (let i = 0; i < this.childSymbols.length; i++) {
                symbol = this.childSymbols[i].findFirstObjectSymbol();
                if (symbol)
                    return symbol;
            }
        }
        return undefined;
    }
    findParentByKind(parentKind) {
        let symbol = this.parent;
        while ((symbol) && (symbol.kind != parentKind))
            symbol = symbol.parent;
        return symbol;
    }
    findParentByKindList(parentKind) {
        let symbol = this.parent;
        while ((symbol) && (parentKind.indexOf(symbol.kind) < 0))
            symbol = symbol.parent;
        return symbol;
    }
    findParentObject() {
        let symbol = this;
        while ((symbol) && (!symbol.isALObject()))
            symbol = symbol.parent;
        return symbol;
    }
    findSymbolAtPosition(position, incCurr) {
        if ((this.range) &&
            (this.range.start.compareVsPosition(position) <= 0) &&
            (this.range.end.compareVsPosition(position) >= 0)) {
            if (this.childSymbols) {
                for (let i = 0; i < this.childSymbols.length; i++) {
                    let symbol = this.childSymbols[i].findSymbolAtPosition(position, true);
                    if (symbol)
                        return symbol;
                }
            }
            if (incCurr)
                return this;
        }
        return undefined;
    }
    getPath() {
        let dataPath = [];
        let symbol = this;
        while (symbol) {
            dataPath.push(symbol.idx);
            symbol = symbol.parent;
        }
        return dataPath;
    }
    getObjectTypeName() {
        switch (this.kind) {
            case azSymbolKind_1.AZSymbolKind.TableObject:
                return "Table";
            case azSymbolKind_1.AZSymbolKind.PageObject:
                return "Page";
            case azSymbolKind_1.AZSymbolKind.ReportObject:
                return "Report";
            case azSymbolKind_1.AZSymbolKind.XmlPortObject:
                return "XmlPort";
            case azSymbolKind_1.AZSymbolKind.QueryObject:
                return "Query";
            case azSymbolKind_1.AZSymbolKind.CodeunitObject:
                return "Codeunit";
            case azSymbolKind_1.AZSymbolKind.ControlAddInObject:
                return "ControlAddIn";
            case azSymbolKind_1.AZSymbolKind.PageExtensionObject:
                return "PageExtension";
            case azSymbolKind_1.AZSymbolKind.TableExtensionObject:
                return "TableExtension";
            case azSymbolKind_1.AZSymbolKind.ProfileObject:
                return "Profile";
            case azSymbolKind_1.AZSymbolKind.PageCustomizationObject:
                return "PageCustomization";
            case azSymbolKind_1.AZSymbolKind.EnumType:
                return "Enum";
            case azSymbolKind_1.AZSymbolKind.DotNetPackage:
                return "DotNetPackage";
            case azSymbolKind_1.AZSymbolKind.EnumExtensionType:
                return "EnumExtension";
            case azSymbolKind_1.AZSymbolKind.Interface:
                return "Interface";
            case azSymbolKind_1.AZSymbolKind.ReportExtensionObject:
                return 'ReportExtension';
            case azSymbolKind_1.AZSymbolKind.PermissionSet:
                return 'PermissionSet';
            case azSymbolKind_1.AZSymbolKind.PermissionSetExtension:
                return 'PermissionSetExtension';
            case azSymbolKind_1.AZSymbolKind.Entitlement:
                return 'Entitlement';
            default:
                return "Undefined";
        }
    }
    hasMethods() {
        if ((this.isALObject()) && (this.childSymbols)) {
            for (let i = 0; i < this.childSymbols.length; i++) {
                if (this.childSymbols[i].isMethod()) {
                    return true;
                }
            }
        }
        return false;
    }
    hasTriggers() {
        if (this.childSymbols) {
            for (let i = 0; i < this.childSymbols.length; i++) {
                if (this.childSymbols[i].isTrigger()) {
                    return true;
                }
            }
            for (let i = 0; i < this.childSymbols.length; i++) {
                if (this.childSymbols[i].hasTriggers()) {
                    return true;
                }
            }
        }
        return false;
    }
}
exports.AZSymbolInformation = AZSymbolInformation;
//# sourceMappingURL=azSymbolInformation.js.map