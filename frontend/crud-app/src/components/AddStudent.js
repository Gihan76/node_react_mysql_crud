import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const AddStudent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name : "",
        email : "",
    });

    // save student data to db using backend function 
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8081/addStudent', formData)
            .then((res) => {
                // console.log("🚀 ~ .then ~ res:", res)
                navigate('/');
            })
            .catch((err) => {
                console.log("🚀 ~ handleSubmit ~ err:", err)
            })
    }

    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    name : e.target.value
                                });
                            }}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email Address"
                            className="form-control"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    email : e.target.value
                                });
                            }}
                        />
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}