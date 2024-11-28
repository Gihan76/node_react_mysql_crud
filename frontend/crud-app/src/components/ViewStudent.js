import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const ViewStudent = () => {
    const { id } = useParams();
    const [studentData, setStudent] = useState([]);

    // get student details using backend function
    useEffect(() => {
        axios.get(`http://localhost:8081/viewStudent/${id}`)
            .then((res) => {
                // console.log("🚀 ~ .then ~ res:", res)
                setStudent(res?.data?.[0]);
            })
            .catch((err) => {
                console.log("🚀 ~ useEffect ~ err:", err)
            })
    }, [id]);

    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <div className="p-2">
                    <h2>Student Details</h2>
                    <h2>{studentData?.id}</h2>
                    <h2>{studentData?.name}</h2>
                    <h2>{studentData?.email}</h2>
                </div>
                <Link to="/" className="btn btn-primary me-2">Back</Link>
                <Link to={`/edit/${studentData?.id}`} className="btn btn-warning">Edit</Link>
            </div>
        </div>
    );
};