const mongoose = require('mongoose')
const Dishes = require('./dishes')


url = "mongodb://localhost:27017/conFusionServer";
const connect = mongoose.connect(url)

connect.then((db) => {
    console.log("Connection established successfully");
    var newDish = Dishes({
        name: "Pizza",
        description: "Test Pizza"
    })
    newDish.save()
    .then((dish) => {
        console.log('Dish which is added is ', dish)

        return Dishes.find({});
    })
    .then((dishes) => {
        console.log("dishes find are: ", dishes)

        return Dishes.remove({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log("Coundn't complete the task due to followinf error: ", err);
    })
})