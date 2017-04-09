import * as lsp from 'vscode-languageserver-types';
import { SymbolStore } from './symbol';
import { ParsedDocumentStore } from './parsedDocument';
export declare class SignatureHelpProvider {
    symbolStore: SymbolStore;
    docStore: ParsedDocumentStore;
    constructor(symbolStore: SymbolStore, docStore: ParsedDocumentStore);
    provideSignatureHelp(uri: string, position: lsp.Position): any;
    private _createSignatureHelp(s, argNumber);
    private _signatureInfo(fn, params);
    private _parameterInfoArray(params);
    private _parameterInfo(s);
    private _getSymbol(callableExpr, context);
    private _functionCallExpressionSymbol(phrase, context);
    private _methodCallExpressionSymbol(phrase, context);
    private _scopedCallExpressionSymbol(phrase, context);
    private _objectCreationExpressionSymbol(phrase, context);
    private _getArgumentNumber(argList, context);
    private _isCallablePhrase(node);
}