const { ObjectId } = require('mongodb');

const logger = require('../logger.js');
const mongo = require('../mongodb.js');
const Models = require('../models');

const db = mongo.db(process.env.DB_NAME);
const tasks = db.collection('tasks');

class TaskController {
  static async getAllTasks(req, res) {
    try {
      const pipeline = [
        {
          '$lookup': {
            'from': 'users', 
            'localField': '_owner', 
            'foreignField': '_id', 
            'as': 'owner'
          }
        }, {
          '$unwind': {
            'path': '$owner'
          }
        }, {
          '$project': {
            'owner': '$owner.name', 
            '_id': 1, 
            'title': 1, 
            'description': 1, 
            'completed': 1, 
            'contributors': 1, 
            'created_at': 1, 
            'finished_at': 1
          }
        }
      ];

      const result = await tasks.aggregate(pipeline).toArray();
      // const result = await tasks.find().toArray();
      logger.info(`${req.method} ${req.originalUrl}`);
      return res.json(result);
    } catch (err) {
      logger.error(err);
    }
  }

  static async getOneTask(req, res) {
    try {
      const ID = ObjectId.createFromHexString(req.params.id);
      const result = await tasks.findOne({_id: ID});
      logger.info(`${req.method} ${req.originalUrl}`);
      return res.json(result);
    } catch (err) {
      logger.error(err);
    }
  }
  
  static async createTask(req, res) {
    try {
      const document = Models.task(req.body);
      const result = await tasks.insertOne(document);
      logger.info(`${req.method} ${req.originalUrl}`);
      return res.json(result);
    } catch (err) {
      logger.error(err);
    }
  }
  
  static async deleteTask(req, res) {
    try {
      const ID = ObjectId.createFromHexString(req.params.id);
      const result = await tasks.deleteOne({_id: ID});
      logger.info(`${req.method} ${req.originalUrl}`);
      return res.json(result);
    } catch (err) {
      logger.error(err);
    }
  }

  static async updateteTask(req, res) {
    try {
      const ID = ObjectId.createFromHexString(req.params.id);
      const result = await tasks.updateOne({_id: ID}, {$set: req.body});
      logger.info(`${req.method} ${req.originalUrl}`);
      return res.json(result);
    } catch (err) {
      logger.error(err);
    }
  }
}

module.exports = TaskController;
