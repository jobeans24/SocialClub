const {connect, connection} = require('mongoose');

const connectionString ='mongodb+srv://josiezobel:ssYrp4KFjNw3LqfZ@cluster0.7bvbkhn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&tls=true'

connect(connectionString);

module.exports = connection;