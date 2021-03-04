const mongoose = require('mongoose')
const Dishes = require('./dishes')


url = "mongodb://localhost:27017/conFusionServer";
const connect = mongoose.connect(url)

connect.then((db) => {
    console.log("Connection established successfully");
    Dishes.create({
        name: "Pizza",
        description: "Test Pizza"
    })
    .then((dish) => {
        console.log('Dish which is added is ', dish)

        return Dishes.findByIdAndUpdate(dish.id,{
            $set: { description: "Test pizza updated" }
        },
        {
            new: true
        }).exec();
    })
    .then((dish) => {
        console.log("dishes find are: ", dish)
        dish.comments.push({
            rating : 4,
            comment: "Hello this is a comment for test purpose",
            author: "XYZ ABC"
        })

        return dish.save()
    })
    .then((dish) => {
        console.log("Dishes after adding comment is: ",dish)

        return Dishes.remove({});
    })
    .then(() => {
        console.log("Dishes got removed")
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log("Coundn't complete the task due to followinf error: ", err);
    })
})