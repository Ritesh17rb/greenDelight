import React, { useState, useEffect } from 'react';
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import { Select } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const [changeStatus, setChangeStatus] = useState(""); // Define changeStatus state
    const [status, setStatus] = useState(["Not Processed", "Processing", "Shipped", "Delivered", "Cancelled"]); // Define status array

    const getOrders = async () => {
        try {
            const { data } = await axios.get('/api/v1/auth/all-orders');
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChange = async (orderId, value) => {

        try {
            const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, { status: value })
            getOrders()

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Layout title={"All Orders Data"}>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className='text-center'>All Orders</h1>
                    <div className="border shadow">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Buyer</th>
                                    <th scope='col'>Date</th>
                                    <th scope='col'>Payment</th>
                                    <th scope='col'>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(orders) && orders.map((o, i) => (
                                    <tr key={i}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <Select bordered={false} onChange={(value) => handleChange(o._id, value)} defaultValue={o?.status}>
                                                {status.map((s, i) => (
                                                    <Option key={i} value={s}>{s}</Option> // Use s instead of status
                                                ))}
                                            </Select>
                                        </td>
                                        <td>{o?.buyer?.name}</td>
                                        <td>{moment(o?.createAt).fromNow()}</td>
                                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                        <td>{o?.products?.length}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="container">
                        {Array.isArray(orders) && orders.map((o, i) => (
                            <div key={i} className="col-md-12 mb-3">
                                {Array.isArray(o.products) && o.products.map((p, j) => (
                                    <div key={j} className="card cart-card">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img
                                                    src={`/api/v1/product/product-photo/${p._id}`}
                                                    className="card-img-top"
                                                    alt={p.name}
                                                    style={{ height: "200px", width: "100%" }}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{p.name}</h5>
                                                    <p className="card-text">{p.description.substring(0, 30)}</p>
                                                    <p className="card-text">Price: ₹{p.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminOrders;
