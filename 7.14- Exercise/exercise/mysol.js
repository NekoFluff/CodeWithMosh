const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true }) // Conenct to the playground database
  .then(() => dbLogger('Connected to the playground database!'))
  .catch((err) => dbLogger('Failed to connect to the playground database', err));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

const courseModel = mongoose.model('Course', courseSchema);

async function getCourses() {
  const courses = await courseModel
    .find({ isPublished: true, tags: { $in: ['backend'] } }) // Case insensitive, Starts with Mosh, Anything afterwards
    .sort({ name: 1 })//.count() // Count instead of select
    .select({ name: 1, author: 1 });
    
  console.log(courses);
}

async function getCourses2() {
  const courses = await courseModel
    .find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } }) // Case insensitive, Starts with Mosh, Anything afterwards
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
    
  console.log(courses);
}

async function getCourses3() {
  const courses = await courseModel
    .find({ isPublished: true }) // Case insensitive, Starts with Mosh, Anything afterwards
    .or([ 
      { name: /.*by.*/  }, 
      { price: { $gte: 15 } }
    ])
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
    
  console.log(courses);
}

getCourses3()


