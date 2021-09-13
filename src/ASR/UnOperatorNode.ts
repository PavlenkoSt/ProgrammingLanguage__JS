import Token from "../Token";
import ExpressionNode from "./ExpressionNode";

export default class UnOperatorNode extends ExpressionNode {
    operator: Token;
    operand: ExpressionNode;

    constructor(operator: Token, operand: ExpressionNode){
        super();
        this.operator = operator;
        this.operand = operand;
    }
}