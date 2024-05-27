
import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { ResultSetHeader } from "mysql2/promise";


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

export async function GET(request: NextRequest){
  try {
    const [result] = await pool.query(
      "SELECT * FROM customers",
    ) as [ResultSetHeader, any];
    return NextResponse.json(result, {status:200})
  }
  catch (e){
      return NextResponse.json(
        { success: false, message: "Failed to fetch customers" },
        { status: 500 }
      );
  }


}
