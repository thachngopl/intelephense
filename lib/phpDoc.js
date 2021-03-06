/* Copyright (c) Ben Robert Mewburn
 * Licensed under the ISC Licence.
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var PhpDocParser;
(function (PhpDocParser) {
    const stripPattern = /^\/\*\*[ \t]*|\s*\*\/$|^[ \t]*\*[ \t]*/mg;
    const tagBoundaryPattern = /(?:\r\n|\r|\n)(?=@)/;
    const summaryBoundaryPattern = /\.(?:\r\n|\r|\n)|(?:\r\n|\r|\n){2}/;
    const methodParamPartBoundaryPattern = /\s*,\s*|\s+/;
    const paramOrPropertyPattern = /^(@param|@property|@property-read|@property-write)\s+(\S+)\s+(\$\S+)\s*([^]*)$/;
    const varPattern = /^(@var)\s+(\S+)(?:\s+(\$\S+))?\s*([^]*)$/;
    const returnPattern = /^(@return)\s+(\S+)\s*([^]*)$/;
    const methodPattern = /^(@method)\s+(?:(\S+)\s+)?(\S+)\(\s*([^]*)\s*\)\s*([^]*)$/;
    function parse(input) {
        if (!input) {
            return null;
        }
        let stripped = input.replace(stripPattern, '');
        let split = stripped.split(tagBoundaryPattern);
        let text = '';
        if (split.length && split[0].indexOf('@') !== 0) {
            text = split.shift().trim();
        }
        let match;
        let tagString;
        let tags = [];
        let tag;
        while (tagString = split.shift()) {
            //parse @param, @var, @property*, @return, @method tags
            tag = parseTag(tagString);
            if (tag) {
                tags.push(tag);
            }
        }
        //must have at least text or a tag
        if (!text && !tags.length) {
            return null;
        }
        return new PhpDoc(text, tags);
    }
    PhpDocParser.parse = parse;
    function parseTag(text) {
        let substring = text.slice(0, 4);
        let match;
        switch (substring) {
            case '@par':
            case '@pro':
                if ((match = text.match(paramOrPropertyPattern))) {
                    return typeTag(match[1], match[2], match[3], match[4]);
                }
                return null;
            case '@var':
                if ((match = text.match(varPattern))) {
                    return typeTag(match[1], match[2], match[3], match[4]);
                }
                return null;
            case '@ret':
                if ((match = text.match(returnPattern))) {
                    return typeTag(match[1], match[2], '', match[3]);
                }
                return null;
            case '@met':
                if ((match = text.match(methodPattern))) {
                    return methodTag(match[1], match[2], match[3], methodParameters(match[4]), match[5]);
                }
                return null;
            default:
                return null;
        }
    }
    function typeTag(tagName, typeString, name, description) {
        return {
            tagName: tagName,
            typeString: typeString,
            name: name ? name : '',
            description: description ? description : ''
        };
    }
    function methodTag(tagName, returnTypeString, name, parameters, description) {
        return {
            tagName: tagName,
            typeString: returnTypeString ? returnTypeString : 'void',
            name: name,
            parameters: parameters,
            description: description ? description : ''
        };
    }
    function methodParameters(input) {
        if (!input) {
            return [];
        }
        let params = [];
        let paramSplit = input.split(methodParamPartBoundaryPattern);
        let typeString, name;
        while (paramSplit.length) {
            name = paramSplit.pop();
            typeString = paramSplit.pop();
            if (name && typeString) {
                params.push({
                    typeString: typeString,
                    name: name
                });
            }
        }
        return params.reverse();
    }
})(PhpDocParser = exports.PhpDocParser || (exports.PhpDocParser = {}));
class PhpDoc {
    constructor(text, tags) {
        this.text = text;
        this.tags = tags;
    }
    get returnTag() {
        return this.tags.find(PhpDoc.isReturnTag);
    }
    get propertyTags() {
        return this.tags.filter(PhpDoc.isPropertyTag);
    }
    get methodTags() {
        return this.tags.filter(PhpDoc.isMethodTag);
    }
    get varTags() {
        return this.tags.filter(PhpDoc.isVarTag);
    }
    findParamTag(name) {
        let fn = (x) => {
            return x.tagName === '@param' && x.name === name;
        };
        return this.tags.find(fn);
    }
    findVarTag(name) {
        let fn = (x) => {
            return x.tagName === '@var' && (!x.name || name === x.name);
        };
        return this.tags.find(fn);
    }
}
exports.PhpDoc = PhpDoc;
(function (PhpDoc) {
    function isPropertyTag(t) {
        return t.tagName.indexOf('@property') === 0;
    }
    PhpDoc.isPropertyTag = isPropertyTag;
    function isReturnTag(t) {
        return t.tagName === '@return';
    }
    PhpDoc.isReturnTag = isReturnTag;
    function isMethodTag(t) {
        return t.tagName === '@method';
    }
    PhpDoc.isMethodTag = isMethodTag;
    function isVarTag(t) {
        return t.tagName === '@var';
    }
    PhpDoc.isVarTag = isVarTag;
})(PhpDoc = exports.PhpDoc || (exports.PhpDoc = {}));
