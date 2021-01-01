const readFile = (fs,res) =>{
    const dataPath = './db/student.json';
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }    
        res.send(JSON.parse(data));
      });
}

module.exports = readFile;