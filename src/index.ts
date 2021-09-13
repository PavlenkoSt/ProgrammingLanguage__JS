import Lexer from "./Lexer";
import Parser from "./Parser";

const code = 
    `код РАВНО 5 ПЛЮС 10 ПЛЮС ( 20 ПЛЮС 20 );
    ЛОГ код;`;

const lexer = new Lexer(code);

lexer.lexAnalyze();

const parser = new Parser(lexer.tokenList);

const rootNode = parser.parseCode();

parser.run(rootNode);
