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
            // Parse the raw response as JSON
            parsedResult = JSON.parse(responseText);
        } catch (jsonError) {
            console.error("JSON Parsing Error:", jsonError);
            return NextResponse.json({ error: "Invalid JSON format from AI response", success: false });
        }

        // Validate the structure of the parsed result
        if (!parsedResult.videoScript || !Array.isArray(parsedResult.videoScript)) {
            return NextResponse.json({ error: "Invalid structure: videoScript is missing or not an array", success: false });
        }

        return NextResponse.json({ result: parsedResult, success: true });
    } catch (error) {
        console.error("Error in get-video-script route:", error);
        return NextResponse.json({ error: "An error occurred in get-video-script route: " + error, success: false });
    }
}
