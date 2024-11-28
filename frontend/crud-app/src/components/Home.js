import { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState([]);

    // get all student data from db
    useEffect(() => {
        axios
            .get('http://localhost:8081/')
            .then((res) => {
                // console.log("🚀 ~ .then ~ res:", res)
                setStudentData(res?.data?.length ? res?.data : []);
            })
            .catch((err) => {
                console.log("🚀 ~ useEffect ~ err:", err)
            })
    }, []);

    // delete student
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8081/deleteStudent/${id}`)
            .then((res) => {
                // console.log("🚀 ~ .then ~ res:", res)
                // location.reload();
                navigate(0);
            })
            .catch((err) => {
                console.log("🚀 ~ handleDelete ~ err:", err)
            });
    };

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
                                        <Link to={`/view/${d?.id}`} className="btn btn-sm btn-info">View</Link>
                                        <Link to={`/edit/${d?.id}`} className="btn btn-sm btn-warning mx-2">Edit</Link>
                                        <button onClick={() => handleDelete(d?.id)} className="btn btn-sm btn-danger">Delete</button>
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