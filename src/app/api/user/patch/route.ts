import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import sql from "@/app/lib/db/db";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { newPassword } = await req.json();

    // Validate required fields
    if (!newPassword) {
      return NextResponse.json(
        { error: "New password is required" },
        { status: 400 }
      );
    }

    // Validate new password strength
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database for the authenticated user only
    const result = await sql`
      UPDATE "Users" 
      SET password = ${hashedNewPassword}
      WHERE id = ${session.user.id}
      RETURNING id, email, name, role, created_at;
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(result[0]);
      
    return NextResponse.json({
      message: "Password updated successfully",
      user: result[0],
    });
  } catch (err: unknown) {
    console.error("Password update error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
