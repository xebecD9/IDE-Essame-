const fs = require('fs');
const path = require('path');
const targetDir = path.join(__dirname);
function removeComments(content) {
  return content.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1').replace(/^\s*$(?:\r\n?|\n)/gm, '');
}
function processDirectory(directory) {
  fs.readdirSync(directory).forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        processDirectory(fullPath);
      }
    } else {
      if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let newContent = removeComments(content);
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Processed: ${fullPath}`);
      }
    }
  });
}
processDirectory(targetDir);
console.log("Done removing comments.");
