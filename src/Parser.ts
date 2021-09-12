import Token from "./Token";
import TokenType from "./TokenType";

export default class Parser {
    tokens: Token[];
    position: number = 0;
    scope: any = {};

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    match(...expected: TokenType[]): Token | null{
        if(this.position < this.tokens.length){
            const currentToken = this.tokens[this.position];
            if(expected.find(type => type.name === currentToken.type.name)){
                this.position += 1;
                return currentToken;
            }
        }
        return null;
    }

    require(...expected: TokenType[]): Token{
        const token = this.match(...expected);
        if(!token){
            throw new Error(`На позиции ${this.position} ожидается ${expected}`);
        }
    }
}