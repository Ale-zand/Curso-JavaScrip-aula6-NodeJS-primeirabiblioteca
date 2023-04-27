import fs from 'fs';
import chalk from 'chalk';
// const chalk = require('chalk'); //forma antiga

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultados.length !==0 ? resultados : chalk.red('não há links no arquivo');
}

function trataErro(erro) {
    console.log(erro);
    throw new Error(chalk.red(erro.code, chalk.red('não há arquivo no diretório')));
}

// Código assíncrono - async / await

async function pegaArquivo(caminhoDoArquivo) {
    try{
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        // extraiLinks(texto);
        return extraiLinks(texto);
        // console.log(chalk.green(texto));
    } catch (erro) {
        trataErro(erro)
    }
}

export default pegaArquivo;

// Código assíncrono - promessas com then()
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.promises
//         .readFile(caminhoDoArquivo, encoding)
//         .then((texto) => console.log(chalk.green(texto)))
//         .catch(trataErro)
// }


// Função Síncrona
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//         if (erro) {
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto));
//     })
// }

// pegaArquivo('./arquivos/texto.md');
// pegaArquivo('./arquivos/');

// \[[^[\]]*?\]
// \(https?:\/\/[^\s?#.].[^\s]*\)
// \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)