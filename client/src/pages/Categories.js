// Categories.js

import React from 'react';
import useCategory from '../hooks/useCategory';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import './Categories.css'; // Import CSS file for styling

const Categories = () => {
    const categories = useCategory();

    return (
        <Layout title="All Categories">
            <div className="container">
                <div className="row">
                    {categories.map((category, index) => (
                        <div className="col-md-4 mb-4" key={index}>
                            <Link to={`/category/${category.slug}`} className="category-link">
                                <div className="category-card">
                                    <div className="category-details">
                                        <h3 className="category-name">{category.name}</h3>
                                        <p className="category-description">{category.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Categories;
