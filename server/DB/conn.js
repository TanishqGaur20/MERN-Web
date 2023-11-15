const mongoose = require('mongoose');

const db = process.env.DATABASE;


mongoose.connect(db).then(() => {
    console.log('Database Connected');
}).catch((err) => {
    console.log(`Database Error ${err}`);
})