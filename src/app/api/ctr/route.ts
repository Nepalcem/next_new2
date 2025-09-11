import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import sql from "@/app/lib/db/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current month and year
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11, so add 1

    // Fetch CTR records for the current month
    const ctrRecords = await sql`
      SELECT 
        id,
        user_id,
        source,
        time_spent,
        description,
        ptm,
        created_at
      FROM "CTR"
      WHERE user_id = ${session.user.id}
        AND EXTRACT(YEAR FROM created_at) = ${currentYear}
        AND EXTRACT(MONTH FROM created_at) = ${currentMonth}
      ORDER BY created_at DESC
    `;

    return NextResponse.json(ctrRecords, { status: 200 });
  } catch (error) {
    console.error("Error fetching CTR records:", error);
    return NextResponse.json(
      { error: "Failed to fetch CTR records" },
      { status: 500 }
    );
  }
}

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

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const ctrId = searchParams.get("id");

    if (!ctrId) {
      return NextResponse.json(
        { error: "CTR ID is required" },
        { status: 400 }
      );
    }

    // Validate that ctrId is a valid number
    const id = parseInt(ctrId);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid CTR ID format" },
        { status: 400 }
      );
    }

    // Check if the CTR record exists and user has access (owner or admin)
    const existingRecord = await sql`
      SELECT id FROM "CTR" 
      WHERE id = ${id} 
        AND (user_id = ${session.user.id} OR ${session.user.role} = 'admin')
    `;

    if (existingRecord.length === 0) {
      return NextResponse.json(
        { error: "CTR record not found or access denied" },
        { status: 404 }
      );
    }

    // Delete the CTR record
    await sql`
      DELETE FROM "CTR" 
      WHERE id = ${id}
    `;

    return NextResponse.json(
      { message: "CTR record deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting CTR record:", error);
    return NextResponse.json(
      { error: "Failed to delete CTR record" },
      { status: 500 }
    );
  }
}
