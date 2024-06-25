const connection = require('./config/connection');
const { User, Thought } = require('./models');

connnection.on("error", console.error.bind(console, "connection error:"));

connection.once("open", async () => {  
 console.log("connected to database");

 let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
    if (userCheck.length) {
        await connection.db.dropCollection("users");
    }

    let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
    if (thoughtCheck.length) {
        await connection.db.dropCollection("thoughts");
    }

    await User.create({
        username: "testUser",
        email: "",
        thoughts: [],
        friends: [],
    });

    await Thought.create({
        thoughtText: "test thought",
        username: "testUser",
        reactions: [],
    });

    console.log("seeded database");

    process.exit(0);
}
);
