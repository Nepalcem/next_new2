import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import sql from "@/app/lib/db/db";

export async function PATCH(request: NextRequest) {
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

    const body = await request.json();
    const { source, time_spent, description, ptm } = body;

    // Check if the CTR record exists and user has access (owner or admin)
    const existingRecord = await sql`
      SELECT id, user_id FROM "CTR" 
      WHERE id = ${id} 
        AND (user_id = ${session.user.id} OR ${session.user.role} = 'admin')
    `;

    if (existingRecord.length === 0) {
      return NextResponse.json(
        { error: "CTR record not found or access denied" },
        { status: 404 }
      );
    }

    // Validate PTM if provided
    if (ptm !== undefined && (ptm < 1 || ptm > 20)) {
      return NextResponse.json(
        { error: "PTM must be between 1 and 20" },
        { status: 400 }
      );
    }

    // Check if any fields are provided for update
    const hasUpdates =
      source !== undefined ||
      time_spent !== undefined ||
      description !== undefined ||
      ptm !== undefined;

    if (!hasUpdates) {
      return NextResponse.json(
        { error: "No fields provided for update" },
        { status: 400 }
      );
    }

    // Update the CTR record with only provided fields
    const updatedCTR = await sql`
      UPDATE "CTR" 
      SET 
        source = COALESCE(${source}, source),
        time_spent = COALESCE(${time_spent}, time_spent),
        description = COALESCE(${description}, description),
        ptm = COALESCE(${ptm}, ptm)
      WHERE id = ${id}
      RETURNING 
        id,
        user_id,
        source,
        time_spent,
        description,
        ptm,
        created_at
    `;

    if (updatedCTR.length === 0) {
      return NextResponse.json(
        { error: "Failed to update CTR record" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "CTR record updated successfully",
        data: updatedCTR[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating CTR record:", error);
    return NextResponse.json(
      { error: "Failed to update CTR record" },
      { status: 500 }
    );
  }
}
