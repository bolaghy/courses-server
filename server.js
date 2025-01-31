// Import necessary modules
const express = require("express");
const Joi = require("joi");
require("dotenv").config();

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000; // Ensure PORT is correctly defined in uppercase

// Middleware
app.use(express.json()); // Middleware to parse JSON requests

// Sample course data
const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
    ];

// Root route
app.get("/", (req, res) => {
    res.send("Hello Bolaghy...");
});

// GET all courses
app.get("/api/courses", (req, res) => {
    res.send(courses);
});

// GET a single course by ID
app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given ID was not found.");
    res.send(course);
});

// POST a new course
app.post("/api/courses", (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// PUT (update) an existing course
app.put("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given ID was not found.");

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});
// DELETE a course
app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given ID was not found.");

    const index = courses.indexOf(course) 
    courses.splice(index, 1)
    res.send(course);
   });

// Function to validate course input
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course); 
}
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});