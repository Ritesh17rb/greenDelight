import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">

                    <input type="text" className="form-control" placeholder='Enter new Category'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}


                    />

                </div>


                <button type="submit" className="btn btn-primary m-3 ">Submit</button>
            </form>

        </>
    )
}

export default CategoryForm
