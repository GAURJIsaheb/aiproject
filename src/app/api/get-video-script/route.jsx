import { NextResponse } from "next/server";
import { chatSession } from "../../../../configs/AiModel";

export async function POST(req) {
    try {
        const { prompt } = await req.json();
        console.log(prompt);

        const result = await chatSession.sendMessage(prompt);
        const responseText = result.response.text();

        console.log("Raw Response:", responseText);

        let parsedResult;
        try {
            // Attempt to parse the raw response directly as JSON
            parsedResult = JSON.parse(responseText);
        } catch (jsonError) {
            console.error("JSON Parsing Error:", jsonError);
            return NextResponse.json({ error: "Invalid JSON format from AI response", success: false });
        }

        // Ensure parsedResult is in the expected structure
        if (!parsedResult || !parsedResult.videoScript) {
            return NextResponse.json({ error: "Invalid response structure", success: false });
        }

        return NextResponse.json({ result: parsedResult, success: true });
    } catch (error) {
        console.error("Error in get-video-script route:", error);
        return NextResponse.json({ error: "An error occurred in get-video-script route: " + error, success: false });
    }
}
