// Import required modules and dependencies
import { connection } from "@/db/config";
import User from "@/Models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Define the POST request handler
export async function POST(req:Request) {
  try {
    // Parse the request body to extract name, email, and password
    const { name, email, password } = await req.json();
    // console.log( name, email, password)
    // Hash the user's password for security
    const hashedPassword = await bcrypt.hash(password, 10);
    // Connect to the MongoDB database
    await connection();

    // Create a new user in the database
    await User.create({ name, email, password: hashedPassword });

    // Respond with a success message and status code 201 (Created)
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    // Handle any errors and respond with an error message and status code 500 (Internal Server Error)
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
