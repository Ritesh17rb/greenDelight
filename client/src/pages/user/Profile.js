import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Link } from 'react-router-dom';


const Profile = () => {

    // Context
    const [auth, setAuth] = useAuth()

    // State

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // Get User Data

    useEffect(() => {

        const { email, name, phone, address } = auth.user
        setName(name)
        setPhone(phone)
        setEmail(email)
        setAddress(address)

    }, [auth?.user])

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/api/v1/auth/profile", {
                name,
                email,
                password,
                phone,
                address,

            });
            if (data?.error) {
                toast.error(data?.error)
            } else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem('auth', JSON.stringify(ls))
                toast.success('Profile Updated Successfully')

            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };


    return (
        <Layout title={"Your Profile"}>

            <div className="container-fluid m-3 p-3">
                <div className="row">

                    <div className="col-md-3"><UserMenu /> </div>
                    <div className="col-md-9">

                        <div className="form-container ">
                            <form onSubmit={handleSubmit}>
                                <h4 className="title">Manage Your Profile</h4>
                                <div className="mb-3">
                                    <label htmlFor="name"><strong>Name</strong> <span></span></label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter Your Name"
                                        autoFocus
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email"><strong>Email</strong> </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter Your Email"
                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password"><strong>Password </strong> </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter Your Password"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone"><strong>Phone</strong></label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="form-control"
                                        id="phone"
                                        placeholder="Enter Your Phone"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address"><strong>Address</strong></label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="form-control"
                                        id="address"
                                        placeholder="Enter Your Address"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>

                            </form>
                        </div>

                    </div>

                </div>

            </div>

        </Layout>
    )
}

export default Profile
