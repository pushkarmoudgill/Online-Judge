const fs=require('fs');
const path=require('path');
const {exec} =require('child_process');

const outputPath=path.join(__dirname,'outputs');

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true});
}
const executeJava=async(filePath)=>{

    const jobID=path.basename(filePath).split('.')[0];
    const outPath = path.join(outputPath, `${jobID}.class`);
    //console.log(outPath);
    //const main="HelloWorld";

    return new Promise((resolve, reject) => {
        exec(
            `javac ${filePath} -d ${outputPath}  && cd ${outputPath}&& java ${"HelloWorld"}`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                   reject(stderr);
                }
                resolve(stdout);
            }
        );
    });
};
    
    module.exports={
        executeJava,
    };