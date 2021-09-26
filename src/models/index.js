const { ObjectId } = require('mongodb');

class Models {
  static task(requestBody) {
    return {
      title: requestBody.taskTitle,
      description: requestBody.taskDescription,
      created_at: new Date(),
      finished_at: new Date(),
      completed: false,
      owner: ObjectId('614e9abd276caddf67c27956'),
      contributors: []
    }
  }
}

module.exports = Models;