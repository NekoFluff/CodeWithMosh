const mongoose = require('mongoose');
const debug = require('debug');

dbLogger = debug('app:database');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true }) // Conenct to the playground database
.then(() => dbLogger('Connected to the playground database!'))
.catch((err) => dbLogger('Failed to connect to the playground database', err));

const courseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 255,
    //match: /pattern/
    
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowercase: true,
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v, callback) {
        // Do some async work

        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);

        }, 3000)
        
      },
      message: 'A course should have at least one tag.'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() { return this.isPublished; },
    min: 10,
    max: 200,
    get: function(v) { return Math.round(v) },
    set: function(v) { return Math.round(v) },
  }
});

const teacherSchema = new mongoose.Schema({
  name: String
})

// Classes
const Course = mongoose.model('Course', courseSchema)

// The collection is based off of the string provided in mongoose.model
const Teacher = mongoose.model('Teacher', teacherSchema)

async function createCourse() {
  // Course object instance (a.k.a. Document)
  const course = new Course({
    name: 'Another Angular Course',
    author: 'Alex',
    tags: ['frontend'],
    isPublished: true,
    category: 'WEB',
    price: 15.75
  });
  
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
  
}

async function createTeacher() {
  // Course object instance (a.k.a. Document)
  const teacher = new Teacher({
    name: 'John Snow'
  });
  
  const result = await teacher.save();
  console.log(result);
}

async function getCourses() {
  // Comparison Query Operators
  // eq (equal)
  // ne (not requal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // in
  //nin (not in)

  // ----------------------------------------------------------------------------
  // Logical query operators

  // Version 1
  // const courses = await Course
  //   .find({ author: 'Mosh', isPublished: true })
  //   //.find({ price: { $gte: 10, $lte: 20 }})
  //   //.find({ price: { $in: [10, 15, 20] }}) // Sect  courses that cost 10, 15, or 20 dollars
  //   .limit(10)
  //   .sort({ name: 1 })
  //   .select({ name: 1, tags: 1 });

  // ----------------------------------------------------------------------------
  // Version 2 with Logical query operators
  //or
  //and

  // const courses = await Course
  //   .find()
  //   .or([ { author: 'Mosh' }, { isPublished: true} ])
  //   .limit(10)
  //   .sort({ name: 1 })
  //   .select({ name: 1, tags: 1 });

  // console.log(courses);

  // ----------------------------------------------------------------------------
  // Version 3 with Regular Expressions, Counting, and Pagination

  const pageNumber = 2;
  const pageSize = 10;
  // How it works in the real worls:
  // /api/courses?pageNumber=2&pageSize=10
  
  
  const courses = await Course
    .find({ author: /^Mosh.*/i}) // Case insensitive, Starts with Mosh, Anything afterwards
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })//.count() // Count instead of select
    .select({ name: 1, tags: 1 });
    
  console.log(courses);
}

async function updateCourseQueryFirst(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = 'Another Author';

  course.set({ 
    isPublished: true,
    author: 'Another Author 2'
  });

  const result = await course.save();
  console.log(result);
}

// Update in database directly without retrieval 
async function updateCourseUpdateFirst(id) {
  const result = await Course.findByIdAndUpdate(id, {
    $set: {
      author: 'Alex New',
      isPublished: false
    }
  }, { new: true });
  
  console.log(result)
}


async function removeCourse(id) {
  //const result = await Course.deleteOne({ _id: id});
  const result = await Course.findOneAndDelete({ _id: id});
  console.log(result);
}

createCourse();
//getCourses();
//createTeacher();
//updateCourseQueryFirst('5c5085ba42a6b63cc43d0cec')
//updateCourseUpdateFirst('5c5085ba42a6b63cc43d0cec')
//removeCourse('5c5085ba42a6b63cc43d0cec')




