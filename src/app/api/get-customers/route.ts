
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";


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

export async function GET(request: NextRequest) {
  try {
    const connection = await pool.getConnection(); 

    // Fetch all plans (adjust the query as needed)
    const [rows] = await connection.query(
      "SELECT * FROM customers"
    );

    connection.release(); // Important: Release the connection back to the pool

    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching plans:", error.message);
    return NextResponse.json(
      { success: false, message: "An error occurred fetching plans." },
      { status: 500 }
    );
  }
}