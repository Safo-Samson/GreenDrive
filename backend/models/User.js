class User {
    constructor(db) {
      this.collection = db.collection('users');
    }
  
    async getUserByEmail(email) {
      return await this.collection.findOne({ email });
    }
  
    async createUser(user) {
      try {
        const result = await this.collection.insertOne(user);
        if (result && result.ops && result.ops.length > 0) {
          return result.ops[0];
        } else {
          console.error('Warning: No user object returned after insertOne');
          return user;
        }
      } catch (error) {
        console.error('Error in createUser:', error);
        throw error;
      }
    }
  }
  
  module.exports = User;
  