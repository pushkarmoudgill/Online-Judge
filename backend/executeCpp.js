const fs=require('fs');
const path=require('path');
const {exec} =require('child_process');

const outputPath=path.join(__dirname,'outputs');

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true});
}



const executeCpp=async(filePath,inputPath)=>{

    const jobID=path.basename(filePath).split('.')[0];
    const outPath = path.join(outputPath, `${jobID}.exe`);

    return new Promise((resolve, reject) => {
        exec(
            `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${jobID}.exe < ${inputPath}`,
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
        executeCpp,
    };