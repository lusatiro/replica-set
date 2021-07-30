const mongodb = require('mongodb');

mongodb.MongoClient.connect('mongodb://mongo0:27017/?readPreference=primary&ssl=false')
  .then(async (client) => {
    const session = client.startSession();

    session.startTransaction();
    try {
      await client.db().collection('user').insertOne({
        name: 'Jamal'
      }, {
        session
      });

      await client.db().collection('user').insertOne({
        name: 'Joaquim'
      }, {
        session
      });

      await session.commitTransaction();
    } catch (e) {
      await session.abortTransaction();
    } finally {
      await session.endSession();
      
      await client.close();
    }
  })
  .catch(e => {
    console.log(e);
  })

