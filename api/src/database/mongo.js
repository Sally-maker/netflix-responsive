const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(() => console.log("connect mongoose"))