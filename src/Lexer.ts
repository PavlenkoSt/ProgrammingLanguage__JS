import Token from "./Token"
import { TokenTypeList } from "./TokenType";

export default class Lexer {
    code: string;
    position: number = 0;
    tokenList: Token[] = [];

    constructor(code: string){
        this.code = code
    }

    lexAnalyze(): Token[]{
        while(this.nextToken()){
            // console.log(this.code[this.position]);
        }
        this.tokenList = this.tokenList.filter(token => token.type.type !== TokenTypeList.SPACE.type);
        return this.tokenList;
    }

    nextToken():boolean {
        if(this.position >= this.code.length){
            return false;
        }
        
        const tokenTypesValues = Object.values(TokenTypeList);

        for(let i = 0; i < tokenTypesValues.length; i++){
            const currentToken = tokenTypesValues[i];
            const regex = new RegExp(`^${currentToken.regex}`);
            const result = this.code.substr(this.position).match(regex);
            
            if(result && result[0]){
                const token = new Token(currentToken, result[0], this.position);
                this.position += result[0].length;
                this.tokenList.push(token);
                return true;
            }
        }

        throw new Error(`На позиции ${this.position} обнаружена ошибка!`);
    }
}