import productModel from "../models/productModel.js";
import fs from 'fs';
import slugify from 'slugify'; // Corrected import statement for slugify

import categoryModel from '../models/categoryModel.js'

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;

        const { photo } = req.files;
        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });

            case !description:
                return res.status(500).send({ error: "Description is Required" });

            case !price:
                return res.status(500).send({ error: "Price is Required" });

            case !category:
                return res.status(500).send({ error: "Category is Required" });

            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });

            case photo && photo.size > 1048576:
                return res.status(500).send({ error: "Photo is required and should be less than 1 mb" });
        }

        const product = new productModel({ ...req.fields, slug: slugify(name) }); // Utilize slugify function here
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error creating product"
        });
    }
};


// Get all Products

export const getProductController = async (req, res) => {


    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "All Products",

            products,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error: error.message


        })
    }
};

// Get Single Product

export const getSingleProductController = async (req, res) => {

    try {

        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product

        })

    } catch (error) {

        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting single Product",
            error
        })
    }
};


// Get Photo

export const productPhotoController = async (req, res) => {

    try {
        const product = await productModel.findById(req.params.pid).select("photo")

        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)

            return res.status(200).send(product.photo.data)


        }

    } catch (error) {

        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting product Photo",
            error
        })
    }
};

// Delete Controller

export const deleteProductController = async (req, res) => {

    try {

        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Deleting",
            error
        })
    }
};

// Update Product

export const updateProductController = async (req, res) => {


    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;

        const { photo } = req.files;
        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });

            case !description:
                return res.status(500).send({ error: "Description is Required" });

            case !price:
                return res.status(500).send({ error: "Price is Required" });

            case !category:
                return res.status(500).send({ error: "Category is Required" });

            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });

            case photo && photo.size > 1048576:
                return res.status(500).send({ error: "Photo is required and should be less than 1 mb" });
        }

        const product = await productModel.findByIdAndUpdate(req.params.pid, {
            ...req.fields, slug: slugify(name)
        }, { new: true }
        )
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Updating product"
        });
    }

};

// filters
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error While Filtering Products",
            error,
        });
    }
};


// product count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error in product count",
            error,
            success: false,
        });
    }
};

// product list base on page
export const productListController = async (req, res) => {
    try {
        const perPage = 9;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in per page ctrl",
            error,
        });
    }
};


// Search Product Controller

export const searchProductController = async (req, res) => {
    try {

        const { keyword } = req.params

        const result = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }


            ]
        }).select("-photo");
        res.json(results)

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Server Error in Product API",
            error

        })
    }
};


// Similar Products

export const relatedProductController = async (req, res) => {

    try {

        const { pid, cid } = req.params
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select("-photo").limit(6).populate('category')
        res.status(200).send({
            success: true,
            products,
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while showing related Products",
            error
        })
    }

}

// Get Product by Category

export const productCategoryController = async (req, res) => {

    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        const products = await productModel.find({ category }).populate('category')
        res.status(200).send({
            success: true,
            category,
            products

        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            error,
            message: 'Error while getting Product'

        })
    }

}
