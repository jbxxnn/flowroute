import { pool } from "@/lib/misc/my_sql";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  try {
    const connection = await pool.getConnection(); 
    let query = "SELECT COUNT(*) FROM customers"

    const [rows] = await connection.query(
      query
    );

    connection.release(); // Important: Release the connection back to the pool
    const _rows = rows as unknown as any
    const data = _rows[0]["COUNT(*)"] || 0

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching customers:", error.message);
    return NextResponse.json(
      { success: false, message: "An error occurred fetching customers." },
      { status: 500 }
    );
  }
}
