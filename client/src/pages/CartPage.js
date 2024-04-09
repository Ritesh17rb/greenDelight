import Layout from "../components/Layout/Layout";
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { Button } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState(null);
    const [loading, setLoading] = useState(false);

    // Total Price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => { total = total + item.price; });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "INR"
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Remove Cart Item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    // Get Payment Gateway Token
    const getToken = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/braintree/token');
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getToken();
    }, [auth?.token]);

    // Handle Payments
    const handlePayment = async () => {
        try {
            setLoading(true);
            if (instance) {
                const { nonce } = await instance.requestPaymentMethod();
                const { data } = await axios.post('/api/v1/product/braintree/payment', {
                    nonce, cart
                });
                setLoading(false);
                localStorage.removeItem('cart');
                setCart([]);
                navigate('/dashboard/user/orders');
                toast.success('Payment Completed Successfully');
            } else {
                toast.error('Payment processing instance not available');
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error('Payment Failed');
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center bg-light p-2 mb-1'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length ? `You have ${cart.length} items in your Cart ${auth?.token ? "" : " Please Login to Checkout"}` : "Your Cart is Empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        <div className="row">
                            {cart?.map(item => (
                                <div key={item._id} className="col-md-12 mb-3">
                                    <div className="card cart-card">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img
                                                    src={`/api/v1/product/product-photo/${item._id}`}
                                                    className="card-img-top"
                                                    alt={item.name}
                                                    style={{ height: "200px", width: "100%" }} // Fixed image height and width
                                                    onClick={() => navigate(`/product/${item.slug}`)}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <p className="card-text">{item.description.substring(0, 30)}</p>
                                                    <p className="card-text">Price: ₹{item.price}</p>
                                                    <button className='btn btn-danger' onClick={() => removeCartItem(item._id)}>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-3 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total: {totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                ) : (
                                    <button className='btn btn-outline-warning' onClick={() => navigate('/login', { state: '/cart' })}>Please Login to Checkout</button>
                                )}
                            </div>
                        )}
                        <div className="mt-2">
                            {!clientToken || !cart?.length ? ("") : (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: 'vault'
                                            }
                                        }}
                                        onInstance={instance => setInstance(instance)}
                                    />
                                    <Button type="primary" onClick={handlePayment} disabled={loading || !instance || !auth?.user?.address}>
                                        {loading ? "Processing ..." : "Make Payment"}
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
