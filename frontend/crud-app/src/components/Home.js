import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom";

export const Home = () => {
    const [studentData, setStudentData] = useState([]);

    // get all student data from db
    useEffect(() => {
        axios
            .get('http://localhost:8081/')
            .then((res) => {
                console.log("🚀 ~ .then ~ res:", res)
                setStudentData(res?.data);
            })
            .catch((err) => {
                console.log("🚀 ~ useEffect ~ err:", err)
            })
    }, []);

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h2>Student List</h2>
                <div className="d-flex justify-content-end">
                    <Link to="/add" className="btn btn-success">Add</Link>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData?.map((d, i) => {
                            return (
                                <tr key={i}>
                                    <td>{d?.id}</td>
                                    <td>{d?.name}</td>
                                    <td>{d?.email}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info">View</button>
                                        <button className="btn btn-sm btn-primary mx-2">Edit</button>
                                        <button className="btn btn-sm btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}