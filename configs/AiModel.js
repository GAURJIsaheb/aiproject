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
              {
                  text: "Write a script to generate a video on topic: {topic} with AI image prompts in {imageStyle} format. Return the output strictly as a JSON object with 'videoScript' as the root key, containing an array of objects with 'imagePrompt' and 'contextText'. Ensure it is properly formatted without extra text.",
              },
          ],
      },
  ],
});

/**
* Fetches the AI-generated video script and ensures proper response formatting.
*/
export const getVideoScript = async (topic, imageStyle) => {
  try {
      const response = await chatSession.sendMessage(`Write a script to generate a video on topic: ${topic} with AI image prompts in ${imageStyle} format.`);

      //console.log("Raw Response:", response);

      if (!response || !response.text) {
          console.error("Error: AI response is empty or undefined.");
          return [];
      }

      let responseData;
      try {
          responseData = JSON.parse(response.text);
      } catch (jsonError) {
          console.error("Error parsing JSON:", jsonError);
          return [];
      }

      console.log("Parsed JSON:", responseData);

      if (!responseData || !responseData.videoScript || !Array.isArray(responseData.videoScript)) {
          console.error("Invalid response format:", responseData);
          return [];
      }

      return responseData.videoScript;
  } catch (error) {
      console.error("Error generating video script:", error);
      return [];
  }
};
