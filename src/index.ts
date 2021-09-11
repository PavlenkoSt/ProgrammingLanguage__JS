import Lexer from "./Lexer";

const code = 
    `код РАВНО 5 ПЛЮС 5;
    ЛОГ код;`;

const lexer = new Lexer(code);

lexer.lexAnalyze();

console.log(lexer.tokenList);
