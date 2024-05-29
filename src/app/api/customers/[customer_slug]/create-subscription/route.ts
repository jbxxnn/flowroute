import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

export async function POST(_request: NextApiRequest, {params}:{params:{customer_slug:string}}) {
  const customer_slug = params.customer_slug
  try {
    // add stripe subscription
    await fetch("https://fbc.versal.tech/stripe/add_subscription.php/", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        userId: customer_slug,
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
      throw `Error saving user on stripe ${JSON.stringify(error)}` 
    })

    return NextResponse.json({
      success: true,
      message: "Item added successfully!",
    });

  } catch (error: any) {
    console.error("Error in API:", error.message);
    return NextResponse.json(
      { success: false, message: "An error occurred." },
      { status: 500 }
    );
  }
}
