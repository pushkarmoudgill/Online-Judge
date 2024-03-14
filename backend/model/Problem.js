const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
   problem_name: {
        type: String,
        required:true,
    },
   
    description: {
        type: String,
        //unique: true,
        required:true,
    },
    constraint: {
        type: String,
        required:true,
    },
    input: {
        type: String,
        required:true,
    },
    output:{
        type :String,
        required:true,
    },
    userId:{
        type: String,
        required:true,
    },
    // testcase: [
    //     {
    //       input: { type: String },
    //       output: { type: String },
          
    //     },
     
    //   ],
    testcaseInput:{
        type: String,
        required:true,
    },
    testcaseOutput:{
        type: String,
        required:true,
    }

});

module.exports = mongoose.model("Problem", problemSchema);