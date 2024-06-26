import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
