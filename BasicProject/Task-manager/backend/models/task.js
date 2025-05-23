import mongoose from "mongoose";
  
const taskSchema = new mongoose.Schema({
  taskName: {
    type:String,
    required:true
  },
  isDone:{
    type:Boolean,
    required:true
  }

})

 const TaskModel = mongoose.model('todos',taskSchema)
 export default TaskModel;