const fs = require('fs');
const path = require('path');

function generateStructure(dir, depth = 0, ignore = ['node_modules', '.git']) {
    const files = fs.readdirSync(dir);
    let output = '';

    files.forEach(file => {
        if (ignore.includes(file)) return;

        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        const indent = '│   '.repeat(depth);

        if (stats.isDirectory()) {
            output += `${indent}├── ${file}/\n`;
            output += generateStructure(filePath, depth + 1, ignore);
        } else {
            output += `${indent}├── ${file}\n`;
        }
    });

    return output;
}

const rootDir = './';
const structure = generateStructure(rootDir);
fs.writeFileSync('project_structure.txt', structure);
console.log('Project structure generated in project_structure.txt');