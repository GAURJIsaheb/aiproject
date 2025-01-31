import { AssemblyAI } from 'assemblyai'
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { audiofileUrl } = await req.json(); // Extract audiofileUrl from request body

        // Validate `audiofileUrl`
        if (!audiofileUrl) {
            throw new Error('Audio file URL is required');
        }

        console.log('Received audio file URL:', audiofileUrl); // Log the received URL

        // Initialize AssemblyAI client
        const client = new AssemblyAI({
            apiKey: process.env.ASSEMBLY_API_KEY, // Ensure this API key is set in your environment
        });

        const FILE_URL = audiofileUrl;
        const data = { audio: FILE_URL };

        console.log('Sending to AssemblyAI:', data); // Log the data being sent to AssemblyAI

        // Send transcription request
        const transcript = await client.transcripts.transcribe(data);

        //console.log('Transcription response:', transcript); // Log the transcription response

        // Return transcription result as JSON response
        return NextResponse.json({ result: transcript.words }, { status: 200 });

    } catch (error) {
        console.error('Error in /api/generate-captions:', error.message || error);

        // Return error response in case of failure
        return NextResponse.json(
            { error: `Error in Generate Captions API: ${error.message}` },
            { status: 500 }
        );
    }
}
