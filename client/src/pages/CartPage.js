import { Layout } from 'antd'
import React from 'react'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()



    // Total Price

    const totalPrice = () => {
        try {
            let total = 0
            cart?.map(item => { total = total + item.price })
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "INR"
            })

        } catch (error) {
            console.log(error)
        }
    }


    // Remove Cart Item
    const removeCartItem = (pid) => {

        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Layout>

            <div className="container">

                <div className="row">

                    <div className="col-md-12">

                        <h1 className='text-center bg-light p-2 mb-1'>

                            {`Hello ${auth?.token && auth?.user?.name}`}

                        </h1>

                        <h4 className='text-center'>

                            {cart?.length ? `You have  ${cart.length} items in your Cart ${auth?.token ? "" : " Please Login to Checkout"}` : "Your Cart is Empty"}

                        </h4>

                    </div>

                </div>

                <div className="row">

                    <div className="col-md-9">


                        <div className="row">
                            {
                                cart?.map
                            }
                        </div>

                    </div>

                </div>

                <div className="row">
                    <div className="col-md-8">

                        <div className="row">

                            {

                                cart?.map(p => (
                                    <div className="row m-2 card">

                                        <div className="col-md-4">

                                            <img
                                                src={`/api/v1/product/product-photo/${p._id}`}
                                                className="card-img-top"
                                                alt={p.name}
                                                style={{ height: "200px" }} // Fixed image height
                                                onClick={() => navigate(`/product/${p.slug}`)}
                                            />

                                        </div>

                                        <div className="col-md-8">

                                            <h4>{p.name}</h4>
                                            <p> {p.description.substring(0, 30)}</p>
                                            <h4>Price : ₹{p.price}</h4>

                                            <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}> Remove</button>

                                        </div>

                                    </div>
                                ))
                            }

                        </div>

                    </div>
                    <div className="col-md-4 text-center">

                        <h2>Cart Summary</h2>
                        <p> Total   |  Checkout  |  Payment </p>
                        <hr />

                        <h4>Toal : {totalPrice()} </h4>

                    </div>

                </div>

            </div>

        </Layout>
    )
}

export default CartPage
