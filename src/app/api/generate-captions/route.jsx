// npm install assemblyai

import { AssemblyAI } from 'assemblyai'
import { NextResponse } from 'next/server';
export async function POST(req){
    try {
        const {audiofileUrl}=await req.json();//ye api call krte time [create-new page.jsx see] : audiofileUrl --> is naam se denge data
            // Validate `audiofileUrl`
        if (!audiofileUrl) {
            throw new Error('Audio file URL is required');
        }
        
        const client=new AssemblyAI({
          apiKey:process.env.ASSEMBLY_API_KEY,
        });
        const FILE_URL=audiofileUrl;
        const data={
          audio:FILE_URL
        }

          const transcript = await client.transcripts.transcribe(data);
          //console.log(transcript.words);//to get timestamps
          return NextResponse.json({"result":transcript.words},{status:200})
        
    } catch (error) {
        console.error('Error in /api/generate-captions:', error.message || error);
        return NextResponse.json(
            { error: `Error in Generate Captions API: ${error.message}` },
            { status: 500 }
          );
    }

}

