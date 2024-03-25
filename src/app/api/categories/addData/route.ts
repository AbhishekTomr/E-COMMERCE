import { connectDB } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";
import _ from "lodash";
import { generateCategories } from "@/helpers/fakeData";

connectDB();

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    for (let i = 0; i < 100; i++) {
      const category = generateCategories();
      const product = new Product({ productId: i, productName: category });
      await product.save();
    }
    return NextResponse.json({ message: "Products added successfully" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
