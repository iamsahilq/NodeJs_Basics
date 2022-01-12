const fs = require('fs');

// directory to check if exists
const dir = './output';

// check if directory exists else create
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const FileS = {
  writeFile: (fileName, jsonData) => {
    const file = `./output/${fileName}`;
    fs.writeFileSync(file, JSON.stringify(jsonData));
    return 1;
  },
};

export default FileS;
