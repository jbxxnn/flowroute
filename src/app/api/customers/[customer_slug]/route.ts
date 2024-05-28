import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { NextApiRequest } from "next";
import { Customer } from "@/lib/types/customers";


// MySQL Connection Configuration (Environment Variables recommended)
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function GET(request: NextApiRequest, {params}:{params:{customer_slug:string}}) {
  const customer_slug = params.customer_slug

  try {
    const connection = await pool.getConnection(); 

    const [rows] = await connection.query(
      `SELECT * FROM customers WHERE email='${customer_slug}' LIMIT 1`
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

