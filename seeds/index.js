const mongoose = require('mongoose');
const cities = require("./cities")
const Campground = require('../models/campground');
const {
    places,
    descriptors
} = require("./seedHelpers")


mongoose.connect("mongodb+srv://our-first-user:7wmVRJRzOBNtjaNo@cluster0.hl4kv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "60b89f1f7034b240c001ad55",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium unde, mollitia suscipit in harum modi, facilis sed dolore animi cum minima possimus voluptatibus ab rerum excepturi error, eaque commodi repellendus.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [{
                    url: 'https://res.cloudinary.com/dldiey81s/image/upload/v1622632691/YelpCamp/xcwmncge1ngwb6xfpq3g.jpg',
                    filename: 'YelpCamp/rsmnwiindfh2g6wbfedg'
                },
                {
                    url: 'https://res.cloudinary.com/dldiey81s/image/upload/v1622632245/YelpCamp/ernquypuyfitfj0xivsw.jpg',
                    filename: 'YelpCamp/fusrgwlwskfybuyl3wwe'
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close()
});