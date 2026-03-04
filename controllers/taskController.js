const tasks = require('../data/task.json');
const fs = require('fs');
const uuid = require('uuid');
const logger = require('../middlewares/logger');
exports.createTask = (req,res)=>{   
    const {title, description, status, priority, due_date} = req.body;
    const allowedPriorities = ['high','medium','low'];
    const allowedStatuses = ['pending','in-process','complete'];

    if(!title || !description || !status || !priority || !due_date){
        logger.warn('Missing Fields!');
        return res.status(200).json({success : false , message:"Missing Fields!"});
    }

    if(!allowedPriorities.includes(priority.toLowerCase())){
        return res.status(200).json({success:false, message:'Priority must be high, medium or low'});
    }
    if(!allowedStatuses.includes(status.toLowerCase())){
        return res.status(200).json({success:false, message:'Status must be pending, in-process or complete'});
    }

    try {
        const newId = uuid.v4();
        const created_at = new Date ();
        const newTask = { id : newId, title, description, status, priority, due_date, created_at};
        tasks.push(newTask);
        fs.writeFile('./data/task.json', JSON.stringify(tasks), (err) => {
            if(err){
                logger.error(`Failed to write : ${err.message}`);
                throw err;
            }
        });
        logger.info(`Task created successfully - ID: ${newId}`);
        return res.status(200).json({success : true, message : "Task Created!"});
    } catch(err) {
        logger.error(`Task creation error: ${err.message}`);
        return res.status(500).json({success : false, message: err.message});
    }
}        

exports.getTasks = (req, res) => {
    const {status, priority, due_date, search, sortBy, sortOrder, page, limit} = req.query;
    let filteredTasks = tasks;
    if(status){
        filteredTasks = filteredTasks.filter(task => task.status === status);
    }
    if(priority){
        filteredTasks = filteredTasks.filter(task => task.priority === priority);
    }
    if(due_date){
        filteredTasks = filteredTasks.filter(task => task.due_date === due_date);
    }
    if(search){
        filteredTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()));
    }

    if(sortBy){
        filteredTasks.sort((a, b) => {
             if(sortBy === 'priority'){
                const priorityOrder = { low: 1, medium: 2, high: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }else if(sortBy === 'due_date'){
                return new Date(a.due_date) - new Date(b.due_date);
            }else if(sortBy === 'created_at'){
                return new Date(a.created_at) - new Date(b.created_at);
            }
            return 0;
        });
        if(sortOrder === 'dsc'){
            filteredTasks.reverse();
        }
    }
    // Example: If page = 2 and limit = 10, then startIndex = (2 - 1) * 10 = 10.
    //This means the second page starts at index 10 (since arrays are zero-based).
    // Example: With page = 2 and limit = 10, endIndex = 2 * 10 = 20.
    // So the slice will go up to index 20 (but not including 20).
    //- slice(startIndex, endIndex) returns elements from startIndex up to (but not including) endIndex.
    
    if(page && limit){
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        filteredTasks = filteredTasks.slice(startIndex, endIndex);
     }
    logger.info(`Tasks retrieved successfully`);
    
    res.status(200).json({success : true, total:filteredTasks.length, data:filteredTasks, message : "Tasks Retrieved!", page:page, limit:limit} );
}

exports.updateTask = (req, res) => {
    const {id} = req.params;
    const {description, status, priority} = req.body;
    const allowedPriorities = ['high','medium','low'];
    const allowedStatuses = ['pending','in-process','complete'];

    const task = tasks.find(task => task.id === id);
    if(!task){
        logger.warn(`Task not found!`);
        return res.status(200).json({success : false , message:"Task not found!"});
    }

    if(status && !allowedStatuses.includes(status.toLowerCase())){
        return res.status(200).json({success:false, message:'Status must be pending, in-process or complete'});
    }
    if(priority && !allowedPriorities.includes(priority.toLowerCase())){
        return res.status(200).json({success:false, message:'Priority must be one of high, medium or low'});
    }

    task.description = description;
    task.status = status;
    task.priority = priority;
    // task.updated_at = new Date();
    const index = tasks.indexOf(task);
    tasks[index] = task;
    fs.writeFile('./data/task.json', JSON.stringify(tasks), (err) => {
        if(err){
            logger.error(`Failed to write : ${err.message}`);
            throw err;
        }
    });
    logger.info(`Task updated successfully - ID: ${id}`);
    res.status(200).json({success : true, message : "Task Updated!"});
}

exports.showTaskById = (req, res) => {
    const {id} = req.params;
    const task = tasks.find(task => task.id === id);
    if(!task){
        logger.warn(` Task not found!`);
        return res.status(200).json({success : false , message:"Task not found!"});
    }
    logger.info(`Task retrieved successfully ${id}`);
    res.json(task);
}

exports.deleteTask = (req, res) => {
    const {id} = req.params;
    const task = tasks.find(task => task.id === id);
    if(!task){
        logger.warn(` Task not found!`);
        return res.status(200).json({success : false , message:"Task not found!"});
    }
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    fs.writeFile('./data/task.json', JSON.stringify(tasks), (err) => {
        if(err){
            logger.error(`Failed to write : ${err.message}`);
            throw err;
        }
    });
    logger.info(`Task deleted successfully - ID: ${id}`);
    res.status(200).json({success : true, message : "Task Deleted!"});
}
