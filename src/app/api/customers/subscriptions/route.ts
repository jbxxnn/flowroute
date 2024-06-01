import { pool } from "@/lib/misc/my_sql";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const limit = url.searchParams.get("limit")
  try {
    const connection = await pool.getConnection(); 
    let query = "SELECT * FROM customers_subscription"

    if (limit){
      query = `${query} LIMIT ${limit}`
    }

    // Fetch all plans (adjust the query as needed)
    const [rows] = await connection.query(
      query
    );

    connection.release(); // Important: Release the connection back to the pool

    console.log({rows})

    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching customer subscriptions:", error.message);
    return NextResponse.json(
      { success: false, message: "An error occurred fetching customer subscriptions." },
      { status: 500 }
    );
  }
}
