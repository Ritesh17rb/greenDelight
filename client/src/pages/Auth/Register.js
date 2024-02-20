import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';

import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");


    // Form function
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name, email, password, address, phone)
        toast.success("Registered Successfully")
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
