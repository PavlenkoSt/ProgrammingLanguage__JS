import Lexer from "./Lexer";
import Parser from "./Parser";

const code = 
    `х РАВНО 5 МИНУС 10 ПЛЮС ( 20 ПЛЮС 20 );
    ЛОГ х;`;

const lexer = new Lexer(code);

lexer.lexAnalyze();

const parser = new Parser(lexer.tokenList);

const rootNode = parser.parseCode();

parser.run(rootNode);