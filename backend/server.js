import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // without this it will throw 500 internal server error for post requests

// db configurations (XAMPP phpmyadmin)
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_react_crud"
});

// backend runs in port
app.listen(8081, () => {
    console.log("listening to port 8081");
})

// fetch all data from student table
app.get('/', (req, res) => {
    const qry = "SELECT * FROM student";
    db.query(qry, (err, result) => {
        if(err) return res.json({Message: "Error fetching student data"});
        return res.json(result);
    })
});

// add new student
app.post('/addStudent', (req, res) => {
    const qry = "INSERT INTO student (`name`, `email`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(qry, [values], (err, result) => {
        if(err) return res.json({Message: "Error adding new student"});
        return res.json(result);
    })
});