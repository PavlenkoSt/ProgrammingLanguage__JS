import ExpressionNode from "./ExpressionNode";

export default class StatementsNode extends ExpressionNode {
    codeStrings: ExpressionNode[] = [];

    addCode(node: ExpressionNode){
        this.codeStrings.push(node);
    }
}