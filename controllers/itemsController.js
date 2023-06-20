const db = require('../config/mongoose');
const Items = require('../models/items');
const logger = require('../config/logger');

//function to get all Items list
module.exports.allItems = async function(req,res){
    try {
        let itemList = await Items.find({});
        if(itemList.length == 0){
            //if no Items is there
            logger.info('No items present in Item list');
            console.log('No items present in the Item List');
            return res.status(200).json({
                messange : "No Items present !"
            })
        }
        logger.info('Items list is found successfully');
        return res.status(200).json({
            message : "Here is the Items List.",
            itemList
        })
    } catch (error) {
        logger.error('error is occured in finding the Items list',error);
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
        logger.info('Item is created successfully resule : ',result);
        console.log('Item is created successfully resule : ',result);
        return res.status(200).json({
            message : "item is created successfully !",
            result
        })
    } catch (error) {
        logger.error('error in creating the new item error :',error);
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
            logger.info('item is found successfully , item :',result);
            return res.status(200).json({
                message : "here is the Item",
                Item : result
            })
        }else{
            logger.warn('there is no item with given id');
            return res.status(200).json({
                message : "There is no Item with given Id is registered."
            })
        }
    } catch (error) {
        logger.error('error in finding the item error');
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
            logger.info('Item is updated successfully, item :',item);
            return res.status(200).json({
                message : "Item is Updated Successfully!",
                item : item
            })
        }
        console.log("key is not valid! , null returned from mongo call");
        logger.warn("key is not valid! , null returned from mongo call")
        return res.status(200).json({
            message : "Incorrect key!   "
        })
    })
    .catch((error)=>{
        logger.error("Error occured in findind and updating the item , error:")
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
        logger.info("Item is deleted Successfully! , delete result :",deleteResult);
        return res.status(200).json({
            message : "Item is deleted Successfully!"
        })
    })
    .catch((error)=>{
        logger.error("error in deleting the item ");
        console.log("error in deleting the item ");
        return res.status(200).json({
            message : "Please give a valid Key"
        })
    })
}