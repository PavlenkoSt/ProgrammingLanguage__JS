import Token from "./Token"

export default class Lexer {
    code: string;
    position: number = 0;
    tokenList: Token[] = [];

    constructor(code: string){
        this.code = code
    }
}