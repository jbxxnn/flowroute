import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { customer_slug: string } }) {
    try {
        const { customer_slug } = params;

        const response = await fetch("https://fbc.versal.tech/stripe/add_subscription.php/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: customer_slug 
            })
        });

        if (!response.ok) {
            const errorData = await response.text(); // Capture error message from PHP
            throw new Error(`PHP Error: ${errorData}`); 
        }

        // Optionally, log the successful response from PHP
        const result = await response.text();
        console.log("PHP Response:", result);

        return NextResponse.json({
            success: true,
            message: "Item added successfully!"
        });

    } catch (error: any) {
        console.error("Error in API:", error); 
        return NextResponse.json(
            { success: false, message: "An error occurred.", error: error.message }, // Include error details
            { status: 500 }
        );
    }
}
