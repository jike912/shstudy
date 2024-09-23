const fs = require('fs');
const ts = require('typescript');

function extractConstant(filename, constantName) {
    const program = ts.createProgram([filename], {});
    const sourceFile = program.getSourceFile(filename);

    let constantValue = null;

    function visit(node) {
        if (ts.isVariableStatement(node)) {
            const declaration = node.declarationList.declarations[0];
            if (ts.isIdentifier(declaration.name) && declaration.name.text === constantName) {
                constantValue = declaration.initializer.text;
            }
        }
        ts.forEachChild(node, visit);
    }

    ts.forEachChild(sourceFile, visit);

    return constantValue;
}

const filename = process.argv[2];
const constantName = process.argv[3];

const value = extractConstant(filename, constantName);
console.log(value);
