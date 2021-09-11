export default class TokenType {
    type: string;
    regex: string;

    constructor(type: string, regex: string){
        this.type = type;
        this.regex = regex;
    }
}

export const TokenTypeList = {
    'NUMBER': new TokenType('NUMBER', '[0-9]*'),
    'VARIABLE': new TokenType('VARIABLE', '[а-я]*'),
    'SEMICOLON': new TokenType('SEMICOLON', ';'),
    'SPACE': new TokenType('SPACE', '[ \\n\\t\\r]'),
    'ASSIGN': new TokenType('ASSIGN', 'РАВНО'),
    'LOG': new TokenType('LOG', 'ЛОГ'),
    'PLUS': new TokenType('PLUS', 'ПЛЮС'),
    'MINUS': new TokenType('MINUS', 'МИНУС'),
    'LPAR': new TokenType('LPAR', '\\('),
    'RPAR': new TokenType('LPAR', '\\)'),
}