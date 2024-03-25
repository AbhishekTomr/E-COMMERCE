import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
import _ from "lodash";

connectDB();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const reqBody = await request.json();
    const { pageNumber, pageSize } = reqBody;
    const skip = (pageNumber - 1) * pageSize;

    const products = await Product.find({}).skip(skip).limit(pageSize);
    const mappedProducts = products.map((productItem: any) => ({
      productId: productItem.productId,
      productName: productItem.productName,
    }));
    return NextResponse.json({ success: true, products: mappedProducts });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
