const fs = require('fs');
const path = require('path');

// Recursively walk the directory
function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Prepare the files object for Netlify deploy
function prepareFilesObject(filePaths) {
  const files = {};
  filePaths.forEach(filePath => {
    const content = fs.readFileSync(filePath);
    const relativePath = path.relative(process.cwd(), filePath);
    files[`/${relativePath}`] = {
      path: `/${relativePath}`,
      sha: require('crypto').createHash('sha1').update(content).digest('hex'),
      content: content.toString('base64'),
    };
  });

  return files;
}

module.exports = { walkDir, prepareFilesObject };
