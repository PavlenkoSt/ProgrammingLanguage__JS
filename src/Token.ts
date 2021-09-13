import TokenType from "./TokenType";

export default class Token {
    type: TokenType;
    name: string;
    position: number;
    text: string = '';

    constructor(type: TokenType, name: string, position: number){
        this.type = type;
        this.name = name;
        this.position = position;
    }
}