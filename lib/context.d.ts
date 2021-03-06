import { PhpSymbol, SymbolKind } from './symbol';
import { SymbolStore, SymbolTable } from './symbolStore';
import { ExpressionTypeResolver, VariableTable } from './typeResolver';
import { NameResolver } from './nameResolver';
import { TreeTraverser } from './types';
import { TypeString } from './typeString';
import { ParsedDocument } from './parsedDocument';
import { Position } from 'vscode-languageserver-types';
import { Phrase, Token, NamespaceDefinition, ClassDeclaration, TokenType, NamespaceUseDeclaration, InlineText } from 'php7parser';
export declare class Context {
    symbolStore: SymbolStore;
    document: ParsedDocument;
    position: Position;
    private _parseTreeSpine;
    private _offset;
    private _namespaceDefinition;
    private _scopePhrase;
    private _scopeSymbol;
    private _variableTable;
    private _thisPhrase;
    private _thisSymbol;
    private _thisBaseSymbol;
    private _nameResolver;
    private _lastNamespaceUseDeclaration;
    private _openingInlineText;
    private _wordStartPosition;
    constructor(symbolStore: SymbolStore, document: ParsedDocument, position: Position);
    readonly uri: string;
    readonly word: string;
    readonly wordStartPosition: Position;
    readonly token: Token;
    readonly offset: number;
    readonly spine: (Token | Phrase)[];
    readonly className: string;
    readonly classBaseName: string;
    readonly namespace: string;
    readonly lastNamespaceUseDeclaration: NamespaceUseDeclaration;
    readonly namespaceDefinition: NamespaceDefinition;
    readonly openingInlineText: InlineText;
    readonly classDeclarationPhrase: ClassDeclaration;
    readonly classSymbol: PhpSymbol;
    readonly classBaseSymbol: PhpSymbol;
    readonly scopePhrase: Phrase;
    readonly scopeSymbol: PhpSymbol;
    readonly variableTable: VariableTable;
    readonly symbolTable: SymbolTable;
    readonly nameResolver: NameResolver;
    textBefore(length: number): string;
    tokenText(t: Token): string;
    nodeText(node: Phrase | Token, ignore?: TokenType[]): string;
    resolveFqn(phrase: Phrase, kind: SymbolKind): string;
    resolveExpressionType(expr: Phrase): TypeString;
    createTraverser(): TreeTraverser<Token | Phrase>;
    createExpressionTypeResolver(): ExpressionTypeResolver;
    private _isAbsoluteScopePhrase(p);
    private _isScopePhrase(p);
    private _isScopeBody(p);
    private _importFilter(s);
    private _isNamespaceDefinition(node);
    private _isClassDeclaration(node);
}
