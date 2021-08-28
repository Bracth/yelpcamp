const mongoose = require("mongoose");
const cities = require("./cities")
const Campground = require("../models/campgroud");
const { places, descriptors } = require("./seedHelpers");
const campgroud = require("../models/campgroud");
const MongoStore = require('connect-mongo');

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp"

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "60ec6d608f637b2ca0ab34b4",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste at illo, dolores temporibus similique beatae, eligendi tempore unde consequatur labore earum necessitatibus facere dolore quas, fugit aliquid blanditiis voluptatem est?",
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dgnr7ah6g/image/upload/v1626196494/Yelpcamp/cpyna3r2orsy5ktt1e6z.jpg',
                    filename: 'Yelpcamp/cpyna3r2orsy5ktt1e6z'
                },
                {
                    url: 'https://res.cloudinary.com/dgnr7ah6g/image/upload/v1626196494/Yelpcamp/ocqzbvljxxl9xpumq7ce.jpg',
                    filename: 'Yelpcamp/ocqzbvljxxl9xpumq7ce'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})