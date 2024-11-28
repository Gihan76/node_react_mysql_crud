import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const EditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name : "",
        email : "",
    });

    // fetch student data first and set on the input fields
    useEffect(() => {
        axios.get(`http://localhost:8081/viewStudent/${id}`)
            .then((res) => {
                // console.log("🚀 ~ .then ~ res:", res)
                setFormData({
                    ...formData,
                    name : res?.data?.[0].name,
                    email : res?.data?.[0].email,
                });
            })
            .catch((err) => {
                console.log("🚀 ~ useEffect ~ err:", err)
            })
    }, [id]);

    // update student data to db using backend function 
    const handleUpdate = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8081/updateStudent/${id}`, formData)
            .then((res) => {
                // console.log("🚀 ~ .then ~ res:", res)
                navigate('/');
            })
            .catch((err) => {
                console.log("🚀 ~ handleUpdate ~ err:", err)
            })
    }
    
    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleUpdate}>
                    <h2>Edit Student</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            value={formData.name}
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
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    email : e.target.value
                                });
                            }}
                        />
                    </div>
                    <button className="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    );
};