import productModel from "../models/productModel.js";
import fs from 'fs';
import slugify from 'slugify'; // Corrected import statement for slugify

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


