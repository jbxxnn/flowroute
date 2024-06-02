import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Customer } from "@/lib/types/customers";
import { pool } from "@/lib/misc/my_sql";


export async function GET(request: NextRequest, { params }: { params: { customer_slug: string } }) {
  const customer_slug = params.customer_slug;

  try {
    const connection = await pool.getConnection(); 

    const [rows] = await connection.query(
      `SELECT * FROM customers WHERE customer_id='${customer_slug}' LIMIT 1`
    );

    let _rows = rows  as unknown as Customer[]
    const customer = _rows[0]  as unknown as Customer

    connection.release(); // Important: Release the connection back to the pool

    return NextResponse.json(customer, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching customer:", error.message);
    return NextResponse.json(
      { success: false, message: "An error occurred fetching customer." },
      { status: 500 }
    );
  }
}

