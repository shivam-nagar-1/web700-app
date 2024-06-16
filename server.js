/*********************************************************************************
* WEB700 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Shivam Nagar | Student ID: 142227230 | Date: June 15, 2024
*
********************************************************************************/

const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const path = require("path");
const collegeData = require("./modules/collegeData");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});

app.get("/students", (req, res) => {
    const course = req.query.course;
    if (course) {
        collegeData.getStudentsByCourse(course)
            .then((students) => {
                res.json(students);
            })
            .catch((err) => {
                res.json({ message: "no results" });
            });
    } else {
        collegeData.getAllStudents()
            .then((students) => {
                res.json(students);
            })
            .catch((err) => {
                res.json({ message: "no results" });
            });
    }
});

app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then((tas) => {
            res.json(tas);
        })
        .catch((err) => {
            res.json({ message: "no results" });
        });
});

app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then((courses) => {
            res.json(courses);
        })
        .catch((err) => {
            res.json({ message: "no results" });
        });
});

app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num)
        .then((student) => {
            res.json(student);
        })
        .catch((err) => {
            res.json({ message: "no results" });
        });
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`server listening on port: ${HTTP_PORT}`);
        });
    })
    .catch((err) => {
        console.log(`Error: ${err}`);
    });
