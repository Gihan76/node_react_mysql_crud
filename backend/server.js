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

// backend runs in port 8081
app.listen(8081, () => {
    console.log("listening to port 8081");
})

// ----------------------------------------- Student Backend Functions -------------------------------------

// fetch all data from student table
app.get('/', (req, res) => {
    const qry = "SELECT * FROM student";
    db.query(qry, (err, result) => {
        if(err) return res.json("error->",err);
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
        if(err) return res.json("error->",err);
        return res.json(result);
    })
});

// fetch student data by id
app.get('/viewStudent/:id', (req, res) => {
    const qry = "SELECT * FROM student WHERE id = ?";
    const id = req.params.id
    db.query(qry, [id], (err, result) => {
        if(err) return res.json("error->",err);
        return res.json(result);
    })
});

// update student
app.put('/updateStudent/:id', (req, res) => {
    const qry = "UPDATE student SET `name` = ? , `email` = ? WHERE id = ?";
    const id = req.params.id;
    const { name, email } = req.body;
    db.query(qry, [name, email, id], (err, result) => {
        if(err) return res.json("error->",err);
        return res.json(result);
    })
});

// delete student
app.delete('/deleteStudent/:id', (req, res) => {
    const qry = "DELETE FROM student WHERE id = ?";
    const id = req.params.id;
    db.query(qry, [id], (err, result) => {
        if(err) return res.json("error->",err);
        return res.json(result);
    })
});

// ----------------------------------------- End of Student Backend Functions -------------------------------------