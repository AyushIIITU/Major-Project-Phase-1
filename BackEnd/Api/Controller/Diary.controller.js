const diary = require('../Models/Diary.model.js');
const User = require('../Models/User.model.js');
const DiaryController={
    addDiary:async(req,res)=>{
        try {
            const {task,type} = req.body;
            if(!req.user){
                return res.status(401).json({message:"You are not authorized to access this resource."})
            }

            const newDiary = new diary({
                task,
                type,
                owner:req.user._id
            });
            await newDiary.save();
            res.status(201).json(newDiary);
        } catch (error) {
            console.log("Error in addDiary",error);
        }
    },
    getDiary:async(req,res)=>{
        try {
            if(!req.user){
                return res.status(401).json({message:"You are not authorized to access this resource."})
            }
            const diaries = await diary.find({owner:req.user._id});
            res.status(200).json(diaries);
        } catch (error) {
            console.log("Error in getDiary",error);
        }
    },
    updateDiary:async(req,res)=>{
        try {
            const {task,type} = req.body;
            const diaryId = req.params.id;
            if(!req.user){
                return res.status(401).json({message:"You are not authorized to access this resource."})
            }
            const updatedDiary = await diary.findByIdAndUpdate(diaryId,{task,type},{new:true});
            res.status(200).json(updatedDiary);
        } catch (error) {
            console.log("Error in updateDiary",error);
        }
    },
    deleteDiary:async(req,res)=>{
        try {
            const diaryId = req.params.id;
            if(!req.user){
                return res.status(401).json({message:"You are not authorized to access this resource."})
            }
            await diary.findByIdAndDelete(diaryId);
            res.status(200).json({message:"Diary Deleted"});
        } catch (error) {
            console.log("Error in deleteDiary",error);
        }
    }

}
module.exports=DiaryController
