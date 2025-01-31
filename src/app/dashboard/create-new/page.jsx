"use client";
import React, { useContext, useEffect, useState } from 'react';
import SelectTopic from './_components/SelectTopic';
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from '@/app/_context/videoDataContext';

function CreateNewVideo() {
  const [formDataa, setformdata] = useState({});
  const [loading, setloading] = useState(false);
  const [videoScriptData, setvideoScriptData] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [captions,setcaptions]=useState(null);

  //use context
  const {videoData,setvideoData}=useContext(VideoDataContext)



  const HandleSubmitButton = () => {
    GetVideoScript();
  };

  const onhandleInputChange = (fieldname, fieldvalue) => {
    console.log(fieldname, fieldvalue);
    setformdata((prev) => ({
      ...prev,
      [fieldname]: fieldvalue
    }));
  };






  // Get video Script from API --> /api/get-video-script,,,,,prompt bun rha idhr
  const GetVideoScript = async () => {
    setloading(true);
    const Makeprompt =
      `Write a script to generate ${formDataa.duration} seconds video on topic: ${formDataa.topic} along with AI image prompt in ${formDataa.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContextText as fields.`;

    try {
        const res = await axios.post('/api/get-video-script', { prompt: Makeprompt });

        if (res.data.success && res.data.result) {
            const videoScriptArray = res.data.result.videoScript;  // ✅ Extracting array

            if (!Array.isArray(videoScriptArray)) {
                console.error("Error: videoScript is not an array.");
                return;
            }

            setvideoData(prev => ({
                ...prev,
                videoScript: videoScriptArray
            }));
            setvideoScriptData(videoScriptArray);

            await GenerateAudioScriptFile(videoScriptArray);
        } else {
            console.error("API Response Error:", res.data.error);
        }
    } catch (error) {
        console.error("Error fetching video script:", error);
    } finally {
        setloading(false);
    }
};







   // Get generate audio file from API --> /api/get-textTOspeech
  const GenerateAudioScriptFile = async (videoScriptData) => {
    setloading(true);

    try {
      let script = '';
      const uniqueId = uuidv4();

      videoScriptData.forEach(item => {
        script = script+item.contextText + ' ';
      });

    const resp=await axios.post('/api/get-textTOspeech', {
        script: script,
        id: uniqueId
      });
        setvideoData(prev=>({
          ...prev,
          'audiofile':resp.data.audioUrl
        }))

        // *** main :console.log("Full Api Response in Audio Script File Url:",resp.data)

        setAudioUrl(resp.data.audioUrl); // Save URL for playback/download
        resp.data.audioUrl && await GenerateCaptions(resp.data.audioUrl,videoScriptData);
      }
     catch (error) {
      console.error('Error generating audio script:', error.message || error);
    } finally {

      setloading(false);
    }
  };









  //Get generate caption from api --> /api/generate-captions
  const GenerateCaptions = async (audioUrl,videoScriptData) => {
    setloading(true);
    try {
      const resp=await axios.post("/api/generate-captions", { audiofileUrl: audioUrl })

        setvideoData(prev=>({
          ...prev,
          'captions':resp.data.result
        }))

        setcaptions(resp?.data?.result)
       /*






       
        resp?.data?.result && await generateImage(videoScriptData);






        */
    } catch (error) {
      console.error("Error generating captions:", error.message || error);
    } finally {

      setloading(false);
    }
    console.log(captions,audioUrl,videoScriptData)
  };








  //To generate images from prompt--> using Replicate ai
  const generateImage = async (videoScriptData) => {
    setloading(true);
    try {
      const firstPrompt = videoScriptData[0]?.imagePrompt[0]; // Get the first image prompt
      if (firstPrompt) {
        const resp = await axios.post('/api/generate-images', {
          promptdata: firstPrompt
        });
  
        setvideoData(prev => ({
          ...prev,
          'images': resp.data.result
        }));
  
        setImageList([resp.data.result]); // Set the first generated image to the state
      }
    } catch (error) {
      console.error("Error generating first image:", error);
    } finally {
      setloading(false);
    }
  };
  
  useEffect(()=>{
    console.log(videoData)
  },[videoData])



  

  return (
    <div className="md:px-20 mt-[25px] ">
      <h2 className="font-bold text-4xl mr-12 mt-8 text-purple-600 text-center">Create New</h2>
      <div className="mt-10 shadow-lg p-10">
        <SelectTopic onUserSelect={onhandleInputChange} />
        <SelectStyle onUserSelect={onhandleInputChange} />
        <SelectDuration onUserSelect={onhandleInputChange} />
        <Button className="bg-green-700 flex w-full mt-8 hover:scale-100 hover:bg-green-500 p-1" onClick={HandleSubmitButton}>
          Submit !
        </Button>
      </div>
      <CustomLoading loading={loading} />
      {/* Display generated content   */}
      {audioUrl && <audio controls src={audioUrl} />}

      {imageList.length > 0 &&
        imageList.map((image, index) => (
        <img key={index} src={image} alt="Generated AI" className="w-full h-auto mt-4" />
  ))
}

    </div>
  );
}

export default CreateNewVideo;
