const fs=require('fs');
const path=require('path');
const { v4:uuid} = require('uuid');

const dirInput=path.join(__dirname,'inputs');

if(!fs.existsSync(dirInput)){
    fs.mkdirSync(dirInput,{recursive:true});
}

const generateInputFile = async(input)=>{
const jobID=uuid();
//console.log(jobID);
const input_filename = `${jobID}.txt`;
//console.log(filename);

const input_filePath=path.join(dirInput,input_filename);
await fs.writeFileSync(input_filePath,input);

return input_filePath;

};

module.exports={
    generateInputFile,
};