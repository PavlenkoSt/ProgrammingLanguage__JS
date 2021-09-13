import BinOperatorNode from "./ASR/BinOperatorNode";
import ExpressionNode from "./ASR/ExpressionNode";
import NumberNode from "./ASR/NumberNode";
import StatementsNode from "./ASR/StatementsNode";
import UnOperatorNode from "./ASR/UnOperatorNode";
import VariableNode from "./ASR/VariableNode";
import Token from "./Token";
import TokenType, { TokenTypeList } from "./TokenType";

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
            throw new Error(`На позиции ${this.position} ожидается ${expected[0].name}`);
        }
        return token;
    }

    parseVariableOrNumber(): ExpressionNode{
        const variable = this.match(TokenTypeList.VARIABLE);
        if(variable !== null){
            return new VariableNode(variable);
        }
        
        const number = this.match(TokenTypeList.NUMBER);
        if(number !== null){
            return new NumberNode(number);
        }

        throw new Error(`Ожидается переменная или число на позиции ${this.position}`)
    }

    parsePrint(): ExpressionNode{
        const operatorLog = this.match(TokenTypeList.LOG);
        if(operatorLog !== null){
            return new UnOperatorNode(operatorLog, this.parseFormula());
        }

        throw new Error(`Ожидается унарный оператор ЛОГ на позиции ${this.position} позиции`);
    }

    parseParenthases(): ExpressionNode{
        if(this.match(TokenTypeList.LPAR) !== null){
            const node = this.parseFormula();
            this.require(TokenTypeList.RPAR);
            return node;
        }else{
            return this.parseVariableOrNumber();    
        }
    }

    parseFormula(): ExpressionNode{
        let leftNode = this.parseParenthases();
        let operator = this.match(TokenTypeList.MINUS, TokenTypeList.PLUS);
        while(operator !== null){
            const rightNode = this.parseParenthases();
            leftNode = new BinOperatorNode(operator, leftNode, rightNode);
            operator = this.match(TokenTypeList.MINUS, TokenTypeList.PLUS);
        }
        return leftNode;
    }

    parseExpression(): ExpressionNode{
        if(this.match(TokenTypeList.VARIABLE) === null){
            const printNode = this.parsePrint();
            return printNode;
        }
        this.position -= 1;
        const variableNode = this.parseVariableOrNumber();
        const assignOperator = this.match(TokenTypeList.ASSIGN);
        if(assignOperator !== null){
            const rightNode = this.parseFormula();
            const binaryNode = new BinOperatorNode(assignOperator, variableNode, rightNode);
            return binaryNode;
        }

        throw new Error(`После переменной ожидаеся оператор присвоения на позиции ${this.position}`)
    }

    parseCode(): ExpressionNode{
        const root = new StatementsNode();
        while(this.position < this.tokens.length){
            const codeStringNode = this.parseExpression();
            this.require(TokenTypeList.SEMICOLON);
            root.addCode(codeStringNode);
        }
        return root;
    }

    run(node: ExpressionNode): any{
        if(node instanceof NumberNode){
            return parseInt(node.number.name);
        }
    }   
}