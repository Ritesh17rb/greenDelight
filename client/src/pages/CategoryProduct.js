// CategoryProduct.js

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SkeletonLoadingCard from './SkeletonLoadingClass'; // Import the skeleton loading component

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        if (params?.slug) getProductByCat();
    }, [params?.slug]);

    const getProductByCat = async () => {
        try {
            setLoading(true); // Set loading to true when fetching products
            const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Set loading to false once products are fetched (success or failure)
        }
    };

    return (
        <Layout>
            <div className="container mt-3">
                <h1 className='text-center'>{category?.name}</h1>

                {/* Display skeleton loading cards if loading is true */}
                {loading && (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {[...Array(6)].map((_, index) => ( // Render 6 skeleton loading cards
                            <SkeletonLoadingCard key={index} cardHeight="200px" /> // Pass the height as a prop
                        ))}
                    </div>
                )}

                {/* Display products only if not loading and products are available */}
                {!loading && products.length > 0 && (
                    <div className="row">
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {products.map((p) => (
                                <div className="col" key={p._id}>
                                    <div className="card custom-card" style={{ backgroundColor: "#f0f0f0", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                                        <img
                                            src={`/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                            style={{ height: "200px" }} // Fixed image height
                                            onClick={() => navigate(`/product/${p.slug}`)}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">
                                                {p.description.substring(0, 30)}...
                                            </p>
                                            <p className="card-text"> ₹ {p.price}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <button className="btn btn-primary" style={{ transition: "transform 0.3s", marginRight: "8px" }}
                                                    onClick={() => navigate(`/product/${p.slug}`)}
                                                >More Details</button>
                                                <button className="btn btn-secondary" style={{ transition: "transform 0.3s", transform: "scale(1)" }} >
                                                    <span style={{ marginRight: "5px" }}>🛒</span>Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default CategoryProduct;
