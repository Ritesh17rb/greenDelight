import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'


const Search = () => {
    const [values, setValues] = useSearch()
    return (
        <Layout title={'Search Results'}>

            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6> {values?.results.length < 1 ? 'No Products Found' : `Found ${values?.results.length}`}</h6>

                    <div className="d-flex flex-wrap mt-4">
                        {values?.results.map((p) => (
                            <div className="col" key={p._id}>
                                <div className="card custom-card" style={{ backgroundColor: "#f0f0f0", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        style={{ height: "200px" }} // Fixed image height
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">
                                            {p.description.substring(0, 30)}...
                                        </p>
                                        <p className="card-text"> ₹ {p.price}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <button className="btn btn-primary" style={{ transition: "transform 0.3s", marginRight: "8px" }}>More Details</button>
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
            </div>

        </Layout>
    )
}

export default Search
