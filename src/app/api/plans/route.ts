
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
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

const formSchema = z.object({
  plan_name: z.string().min(1, { message: "Plan Name must be at least 1 character long" }),
  plan_description: z.string().min(1, { message: "Plan Description must be at least 1 character long" }),
  included_minutes: z.string().min(1, { message: "Included Minutes is required" }),
  plan_price: z.string().min(1, { message: "Plan Price is required" }),
});

export async function GET(request: NextRequest) {
  try {
    const connection = await pool.getConnection(); 

    // Fetch all plans (adjust the query as needed)
    const [rows] = await connection.query(
      "SELECT * FROM price_plans"
    );

    connection.release(); // Important: Release the connection back to the pool

    console.log({rows})

    return NextResponse.json(rows, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching plans:", error.message);
    return NextResponse.json(
      { success: false, message: "An error occurred fetching plans." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    formSchema.parse(data);
    const { plan_name, plan_description, included_minutes, plan_price } = data;

    // Insert into MySQL
    const [result] = await pool.query(
      "INSERT INTO price_plans (plan_name, plan_description, included_minutes, plan_price) VALUES (?, ?, ?, ?)",
      [plan_name, plan_description, included_minutes, plan_price]
    ) as [ResultSetHeader, any];

    if (result.affectedRows === 1) {
      // logic to add to php
      await fetch("https://fbc.versal.tech/stripe/create_product.php/", {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          productName: plan_name,
          productDescription: plan_description,
          price: plan_price,
        })
      })

      return NextResponse.json({
        success: true,
        message: "Plan added successfully!",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to add plan." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.format() }, {
        status: 400,
      });
    } else if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { success: false, message: "A Plan with this ID already exists." },
        { status: 409 }
      );
    } else {
      console.error("Error in API:", error.message);
      return NextResponse.json(
        { success: false, message: "An error occurred." },
        { status: 500 }
      );
    }
  }
}
