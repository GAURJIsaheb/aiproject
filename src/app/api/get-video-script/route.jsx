import { NextResponse } from "next/server";
import { chatSession } from "../../../../configs/AiModel";

export async function POST(req) {
    try {
        const { prompt } = await req.json();
        console.log(prompt);

        const result = await chatSession.sendMessage(prompt);
        const responseText = await result.response.text();

       // console.log("Raw Response:", responseText);

        let parsedResult;
        try {
            parsedResult = JSON.parse(responseText);
        } catch (jsonError) {
            console.error("JSON Parsing Error:", jsonError);
            return NextResponse.json({ error: "Invalid JSON format from AI response", success: false });
        }

        return NextResponse.json({ result: parsedResult, success: true });
    } catch (error) {
        console.error("Error in get-video-script route:", error);
        return NextResponse.json({ error: "An error occurred in get-video-script route: " + error, success: false });
    }
}
