import { SymbolStore } from './symbolStore';
import { ParsedDocumentStore } from './parsedDocument';
import * as lsp from 'vscode-languageserver-types';
export interface CompletionOptions {
    maxItems: number;
    addUseDeclaration: boolean;
    backslashPrefix: boolean;
}
export declare class CompletionProvider {
    symbolStore: SymbolStore;
    documentStore: ParsedDocumentStore;
    private _maxItems;
    private _strategies;
    private _config;
    private static _defaultConfig;
    constructor(symbolStore: SymbolStore, documentStore: ParsedDocumentStore, config?: CompletionOptions);
    config: CompletionOptions;
    provideCompletions(uri: string, position: lsp.Position): lsp.CompletionList;
}
