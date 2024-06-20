
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { ResultSetHeader } from "mysql2/promise";
import { pool } from "@/lib/misc/my_sql";
import { planFormSchema } from "@/app/(app)/plans/misc/zod";

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
    planFormSchema.parse(data);
    const { plan_name, plan_type, plan_description, included_minutes, included_channels, cost_additional_channels, plan_price, additional_minutes, included_numbers, number_cost } = data;

    // logic to add to stripe
    await fetch("https://fbc.versal.tech/stripe/create_product.php/", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        productName: plan_name,
        productDescription: plan_description,
        price: plan_price,
        minutes: included_minutes,
        channels: included_channels,
        costChannel: cost_additional_channels,
        plan_type,
        additional_minutes: additional_minutes,
        included_numbers: included_numbers,
        number_cost: number_cost,
      })
    }).then(res=>res.text()).then(async(res)=>{
      console.log(res)
    })

    .catch(async (error)=>{
      console.error({error})
      throw "Failed to add plan to stripe."
    })

    return NextResponse.json({
      success: true,
      message: "Plan added successfully!",
    });
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
