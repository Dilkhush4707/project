import  TaskModel  from "../models/task.js";


export const CreateTask =  async (req ,res)=>{
  const data =req.body;
   try {
    const model =new TaskModel(data);
    await model.save();
    res.status(201).json({msg:"task created", success:true})
    console.log(data);
   
   } catch (err) {
    res.status(500).json({msg: 'Failed to create task try again ' ,success :false});
   }
}
export const getAllTask =  async (req ,res)=>{
   try {
     const data =await TaskModel.find({});
   
    res.status(201).json({msg:"all task ", success:true,data})
   
   } catch (err) {
    res.status(500).json({msg: 'Failed to get all task try again ' ,success :false});
   }
}
export const upadateTaskById =  async (req ,res)=>{
 
   try {
    const id = req.params.id;
    const body =req.body;
    const obj ={$set:{...body}};
     await TaskModel.findByIdAndUpdate(id ,obj)
    
    res.status(200).json({msg:"task update", success:true})
    
   
   } catch (err) {
    res.status(500).json({msg: 'Failed to update task try again ' ,success :false});
   }
}

export const deleteTaskById =  async (req ,res)=>{
  
   try {
    const id =req.params.id;
    await TaskModel.findByIdAndDelete(id);
   
    res.status(200).json({msg:"task deleted", success:true})
   
   } catch (err) {
    res.status(500).json({msg: 'Failed to delete task try again ' ,success :false});
   }
}

