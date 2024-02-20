import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';



const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();


    // Form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/register',
                { name, email, password, phone, address });

            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                navigate('/login');
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error('Error: Please fill all fields!')
        }
    }

    return (
        <Layout title={'Register Yourself'}>
            <div className="register">
                <h1>Register Page</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputName">Name <span style={{ color: 'red' }}>*</span></label>
                        <input type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="exampleInputName"
                            placeholder="Enter Name"
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail">Email <span style={{ color: 'red' }}>*</span></label>
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder="Enter Email"
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password <span style={{ color: 'red' }}>*</span></label>
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPhone">Phone <span style={{ color: 'red' }}>*</span></label>
                        <input type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="exampleInputPhone"
                            placeholder="Enter Phone"
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputAddress">Address <span style={{ color: 'red' }}>*</span></label>
                        <input type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder="Enter Address"
                            required />
                    </div>
                    <button type="submit" className="btn btn-info my-4">Submit</button>
                </form>
            </div>
        </Layout>
    );
}

export default Register;
