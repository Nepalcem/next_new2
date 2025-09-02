import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import sql from "@/app/lib/db/db";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { source, time_spent, description, ptm } = body;

    // Validate required fields
    if (!source || !description || ptm === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: source, description, ptm" },
        { status: 400 }
      );
    }

    // Validate PTM is between 1-100
    if (ptm < 1 || ptm > 100) {
      return NextResponse.json(
        { error: "PTM must be between 1 and 100" },
        { status: 400 }
      );
    }

    // Create the CTR record
    const newCTR = await sql`
       INSERT INTO "CTR" (user_id, source, time_spent, description, ptm)
       VALUES (${session.user.id}, ${source}, ${
      time_spent || 30
    }, ${description}, ${ptm})
       RETURNING 
         id,
         user_id,
         source,
         time_spent,
         description,
         ptm,
         created_at
     `;

    return NextResponse.json(newCTR[0], { status: 201 });
  } catch (error) {
    console.error("Error creating CTR record:", error);
    return NextResponse.json(
      { error: "Failed to create CTR record" },
      { status: 500 }
    );
  }
}
