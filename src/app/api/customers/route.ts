
import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2/promise";
import { customerFormSchema } from "@/app/(app)/customers/misc/zod";
import * as z from "zod";
import { pool } from "@/lib/misc/my_sql";



export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const limit = url.searchParams.get("limit")
  try {
    const connection = await pool.getConnection(); 
    let query = "SELECT * FROM customers"

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
    console.error("Error fetching customers:", error.message);
    return NextResponse.json(
      { success: false, message: "An error occurred fetching customers." },
      { status: 500 }
    );
  }
}


export async function POST(request: NextRequest) {

  const data = await request.json();

  try {
    const _data = customerFormSchema.safeParse(data);


    if (!_data.success){
      return NextResponse.json({success:false, errors: _data.error}, {status:400})
    }

    const {fullname, phone, email, street_address, city, state, zip_code, access_key, secret_key, billing_day, subscription_type, phone_plan, metered_billing_plan, metered_sip_trunk_usage, cloud_server_hosting_subscription, extra_numbers:_extra_numbers, included_channels:_included_channels} = _data.data

    const extra_numbers = _extra_numbers || 0

    const included_channels = _included_channels || 0

    const product_id = (subscription_type === "metered" || subscription_type === "unmetered") ? phone_plan : metered_billing_plan

    // add to db -> add to stripe 
    // if stripe fails -> delete user in db

    // Insert into MySQL
    const [result] = await pool.query(

      `INSERT INTO customers (fullname, phone, email, street_address, city, state, zip_code, access_key, secret_key, billing_day, subscription_type, extra_numbers, product_id, metered_sip_trunk_usage, cloud_server_hosting_subscription, included_channels) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fullname, phone, email, street_address, city, state, zip_code, access_key, secret_key, billing_day, subscription_type, extra_numbers, product_id, metered_sip_trunk_usage, cloud_server_hosting_subscription, included_channels]
    ) as [ResultSetHeader, any];
    console.log({result})

    if (result.affectedRows === 1) {

      console.log("Going to stripe")

      // save to stripe
      await fetch("https://fbc.versal.tech/stripe/customer_stripe.php/", {
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          userId: result.insertId,
        })
      }).then(res=>{
        if (!res.ok){
          console.log({res:JSON.stringify(res)})
          throw ("error")
        }
        return res.text()
      }).then(async (res)=>{
        console.log({res})
      }).catch(async (error)=>{
        console.log("error",{error})
        const connection = await pool.getConnection(); 

        // Fetch all plans (adjust the query as needed)
         await connection.query(
          `DELETE FROM customers WHERE customer_id = '${result.insertId}'`
        );
        connection.release(); // Important: Release the connection back to the pool

        throw `Error saving user on stripe ${JSON.stringify(error)}` 
      })


      return NextResponse.json({
        success: true,
        data: {..._data.data, customer_id:result.insertId},
        message: "Item added successfully!",
        id: result.insertId,
      });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to add item." },
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
        { success: false, message: "An item with this ID already exists." },
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
