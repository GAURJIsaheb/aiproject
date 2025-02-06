import { NextResponse } from "next/server";
import { videoDataTableName } from "../../../../configs/schema";
import { db_VAR } from "../../../../configs/db";
import { eq } from "drizzle-orm";

export async function DELETE(req) {
  // Retrieve ID from the request body
  const { id } = await req.json();  // Extract id from the JSON body of the DELETE request
  //console.log("id----->",id)

  try {
    // Attempt to delete the video
    const result = await db_VAR
      .delete(videoDataTableName)
      .where(eq(videoDataTableName?.id,id));  // Using the .is() method to compare UUID

    if (result === 0) {
      return NextResponse.json({ message: "No video found with that ID" }, { status: 404 });
    }

    // Send a success response after deletion
    return NextResponse.json({ message: "Video deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting video:", error);
    return NextResponse.json({ message: "Error deleting video" }, { status: 500 });
  }
}
