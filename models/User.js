class User {
    constructor(db) {
      this.collection = db.collection('users');
    }
  
    async getUserByEmail(email) {
      return await this.collection.findOne({ email });
    }
  
    async createUser(user) {
      const result = await this.collection.insertOne(user);
      return result.ops[0];
    }
  }
  
  module.exports = User;
  