const MongoClient = require("mongodb").MongoClient;
let _db;



const mongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://daomanhhung:12022001Hung@cluster0.taold.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connected");
      _db = client.db();
      cb();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "no database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
