const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "write a script to generate 10 seconds video on topic:Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContextTest as field\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"video_script\": [\n    {\n      \"scene_number\": 1,\n      \"duration\": 2,\n      \"imagePrompt\": \"A bustling Roman marketplace, realistic, filled with merchants, shoppers in togas, various stalls displaying pottery, fabrics, and food, sunny day, ancient Rome setting, depth of field\",\n      \"contextText\": \"Imagine a vibrant marketplace in ancient Rome...\"\n    },\n    {\n        \"scene_number\": 2,\n        \"duration\": 2,\n         \"imagePrompt\": \"A small group of roman children playing a simple game with stones in the corner of the market, one laughing child, other serious, detailed clothing, realistic, sunny day, natural light\",\n        \"contextText\": \"...where children played games in the dusty corners.\"\n      },\n      {\n        \"scene_number\": 3,\n        \"duration\": 3,\n          \"imagePrompt\": \"Close-up on a small, clay tablet inscribed with neat cuneiform writing, realistic, showing an ancient legal document, the clay is rough and worn, slight cracks, natural lighting\",\n        \"contextText\": \"Unbeknownst to them, a seemingly ordinary clay tablet held a secret...\"\n      },\n     {\n       \"scene_number\": 4,\n       \"duration\": 3,\n      \"imagePrompt\": \"A realistic depiction of a Roman scholar with a long beard reading the clay tablet in the study with scrolls, books in background, dimly lit, oil lamp on the table, depth of field\",\n       \"contextText\": \"...a hidden clause, discovered centuries later, which would alter the course of Roman Law.\"\n     }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
