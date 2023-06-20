const db = require('../config/mongoose');
const Items = require('../models/items');

//function to get all Items list
module.exports.allItems = async function(req,res){
    try {
        let itemList = await Items.find({});
        if(itemList.length == 0){
            //if no Items is there
            return res.status(200).json({
                messange : "No Items present !"
            })
        }
        return res.status(200).json({
            message : "Here is the Items List.",
            itemList
        })
    } catch (error) {
        console.log('error is occured :',error);
        res.status(500).json({
            message : "Something Error is occured ."
        });
        
        return;
    }
}
//function to create a new Item in Item List
module.exports.create = async function(req,res){
    try {
        let result = await Items.create({
            name : req.body.name
        })
        console.log('Item is created successfully resule : ',result);
        return res.status(200).json({
            message : "item is created successfully !",
            result
        })
    } catch (error) {
        console.log('error in creating the new item error :',error);
        return res.status(200).json({
            message : "Error in creating the item"
        })
    }
}
//function to get One Item by It's Id
module.exports.oneItem = async function(req,res){
    try {
        let result = await Items.findOne({'_id':req.params.id});
        console.log(result);
        if(result){
            return res.status(200).json({
                message : "here is the Item",
                Item : result
            })
        }else{
            return res.status(200).json({
                message : "There is no Item with given Id is registered."
            })
        }
    } catch (error) {
        console.log('error in finding the item error');
        return res.status(200).json({
            message : "Invalid ID."
        })
    }
}
//function to Update One function By its Id
module.exports.updateOne = async function(req,res){
    await Items.findById(req.params.id)
    .then((item)=>{
        if(item != null){
            item.name = req.body.name
            item.save()
            console.log('Item is updated successfully, item :',item);
            return res.status(200).json({
                message : "Item is Updated Successfully!",
                item : item
            })
        }
        console.log("key is not valid! , null returned from mongo call");
        return res.status(200).json({
            message : "Incorrect key!   "
        })
    })
    .catch((error)=>{
        console.log("Error occured in findind and updating the item , error:");
        return res.status(200).json({
            message : "Please submit valid Key!"
        })
    })
}
//function to delete a Item by its
module.exports.delete = async function(req,res){
    const Id = req.params.id;
    await Items.findByIdAndDelete(Id)
    .then((deleteResult)=>{
        console.log("Item is deleted Successfully! , delete result :",deleteResult);
        return res.status(200).json({
            message : "Item is deleted Successfully!"
        })
    })
    .catch((error)=>{
        console.log("error in deleting the item ");
        return res.status(200).json({
            message : "Please give a valid Key"
        })
    })
}