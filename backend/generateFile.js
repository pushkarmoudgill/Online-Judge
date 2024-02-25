const fs=require('fs');
const path=require('path');
const { v4:uuid} = require('uuid');

const dirCode=path.join(__dirname,'codes');

if(!fs.existsSync(dirCode)){
    fs.mkdirSync(dirCode,{recursive:true});
}

const generateFile=async(format,content)=>{
const jobID=uuid();
console.log(jobID);
const filename = `${jobID}.${format}`;
console.log(filename);

const filePath=path.join(dirCode,filename);
await fs.writeFileSync(filePath,content);

return filePath;

};

module.exports={
    generateFile,
};