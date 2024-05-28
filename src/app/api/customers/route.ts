
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

import * as z from "zod";
import { ResultSetHeader } from "mysql2/promise";

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  phone: z.string().min(2, {
    message: 'Phone number is required',
  }).regex(new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  ), 'Please enter a valid phone number'),
  email: z.string().min(1, {
    message: 'Email must be at least 2 characters.',
  }).email("Please input a valid email"),
  street_address: z.string().min(2, {
    message: 'Street Address must be at least 2 characters.',
  }),
  city: z.string().min(2, {
    message: 'City must be at least 2 characters.',
  }),
  state: z.string().min(2, {
    message: 'State must be at least 2 characters.',
  }),
  zip_code: z.string().min(2, {
    message: 'ZipCode must be at least 2 characters.',
  }),
  access_key: z.string().min(2, {
    message: 'Customer Access Key must be at least 2 characters.',
  }),
  secret_key: z.string().min(2, {
    message: 'Customer Secret Key must be at least 2 characters.',
  }),

  extra_field: z.string(),

  billing_day: z.number({required_error:"This field is required"}),
  metered_billing_plan: z.string().min(2, {
    message: 'Metered Billing Plan must be at least 2 characters.',
  }),

  metered_sip_trunk_usage: z.number({required_error:'SIP Trunk usage is required.'}).min(1, {
    message: 'SIP Trunk usage must be at least 2 characters.',
  }),
  cloud_server_hosting_subscription: z.number({required_error: 'Cloud Server Hosting Subscription is required'}).min(1, {
    message: 'Cloud Server Hosting Subscription must be greater than 0.',
  }),
});

export async function POST(request: NextRequest) {

  const data = await request.json();

  try {
    const _data = formSchema.safeParse(data);
    if (!_data.success){
      return NextResponse.json({success:false, errors: _data.error}, {status:400})
    }

    const id = "some random id"
    const {fullname, phone, email, street_address, city, state, zip_code, access_key, secret_key, billing_day, metered_billing_plan, metered_sip_trunk_usage, cloud_server_hosting_subscription} = _data.data

    // Insert into MySQL
    const [result] = await pool.query(
      "INSERT INTO customers (fullname, phone, email, street_address, city, state, zipcode, customer_access_key, customer_secret_key, customer_billing_day, metered_billing_plan, metered_SIP_trunk_usage, cloud_server_hosting_subscription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [fullname, phone, email, street_address, city, state, zip_code, access_key, secret_key, billing_day, metered_billing_plan, metered_sip_trunk_usage, cloud_server_hosting_subscription]
    ) as [ResultSetHeader, any];

    if (result.affectedRows === 1) {
      return NextResponse.json({
        success: true,
        message: "Item added successfully!",
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
