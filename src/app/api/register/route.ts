import { NextResponse } from "next/server";
import sql from "@/app/lib/db/db";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    if (!email.includes("monster")) {
      return NextResponse.json(
        { error: "Email must be valid. Try again" },
        { status: 400 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await sql`
      INSERT INTO "Users" (email, password, name)
      VALUES (${email}, ${hashedPassword}, ${name || null})
      RETURNING id, email, name, role, created_at;
    `;

    return NextResponse.json({ user: result[0] });
  } catch (err: unknown) {
    // Handle duplicate email error
    if (err instanceof Error && err.message.includes("duplicate key")) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}