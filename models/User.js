const { ObjectId } = require('mongodb');

class User {
  constructor(db) {
    this.collection = db.collection('users');
  }

  async createUser(user) {
    const result = await this.collection.insertOne(user);
    return result.ops[0];
  }

  async getUserByEmail(email) {
    const user = await this.collection.findOne({ email });
    return user;
  }

  async getUserById(id) {
    const user = await this.collection.findOne({ _id: ObjectId(id) });
    return user;
  }
}

module.exports = User;
