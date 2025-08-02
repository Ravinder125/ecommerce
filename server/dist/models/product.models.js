import mongoose from 'mongoose';
const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "User ID is required"] },
    name: { type: String, required: [true, "User name is required"] },
    comment: { type: String, required: [true, "Comment text is required"] },
    rating: { type: Number, required: [true, "Rating is required"] },
    createdAt: { type: Date, default: Date.now() },
}, { _id: false });
const ProductSchema = new mongoose.Schema({
    owner: {
        type: String,
        trim: true,
        required: [true, "Owner ID is required"]
    },
    name: {
        type: String,
        required: [true, "Product name is required"],
        maxlength: [200, "Product name cannot exceed 120 characters"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        maxlength: [999999, "Price cannot exceed 6 digit"],
    },
    brand: {
        type: String,
        required: [true, "Product brand is required"],
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
    },
    stock: {
        type: Number,
        min: [0, "Stock cannot be negative"],
        default: 0,
    },
    sold: {
        type: Number,
        minlength: [0, "Sales cannot be negative"],
        default: 0
    },
    images: [{
            image: String,
            public_id: String,
            _id: false,
        }],
    ratings: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be negative"]
    },
    numOfReviews: {
        type: Number,
        default: 0,
        min: [0, "Number of Reviews cannot be negative"]
    },
    reviews: [ReviewSchema],
}, { timestamps: true });
export const Product = mongoose.model("Product", ProductSchema);
