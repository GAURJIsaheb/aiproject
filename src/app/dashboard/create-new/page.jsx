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
import { db_VAR } from '../../../../configs/db';
import { useUser } from '@clerk/nextjs';
import { videoDataTableName } from '../../../../configs/schema';
import PlayerDialog from '../_components/PlayerDialog';

function CreateNewVideo() {
  const [formDataa, setformdata] = useState({});
  const [loading, setloading] = useState(false);
  const [videoScriptData, setvideoScriptData] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [captions,setcaptions]=useState(null);
  
  //To Play Video
  const[playVideoValue,setplayVideoValue]=useState(true)
  const[videoIdValue,setvideoIdValue]=useState("f512ee39-f0cf-451d-af2e-b52a49101c21")


  //use context
  const {videoData,setvideoData}=useContext(VideoDataContext)

  //getting user email/id  from clerk:jis bhi id se sign in hua ho user
  const {user}=useUser();



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
                'videoScript': videoScriptArray
            }));
            setvideoScriptData(videoScriptArray);
           // console.log("SCript data--->",videoScriptArray);

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
          'audiofileUrl':resp.data.audioUrl
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
       






       
    //resp?.data?.result && await generateImage(videoScriptData);

    } catch (error) {
      console.error("Error generating captions:", error.message || error);
    } finally {

      setloading(false);
    }
    //console.log(captions,audioUrl,videoScriptData)
  };








  //To generate images from prompt--> using Replicate ai
  const generateImage = async (videoScriptData) => {
    setloading(true);
  
    let images = [];
    const maxImages = 4; // Limit to 4 images
    const limitedScriptData = videoScriptData.slice(0, maxImages); // Take first 5 elements,,that generate 5 images
  
    for (const element of limitedScriptData) {
      try {
        const resp = await axios.post('/api/generate-images', {
          promptdata: element.imagePrompt, // Generate images from prompts
        });
  
        setvideoData((prev) => ({
          ...prev,
          'imagesUrl': [...(prev.imagesUrl || []), resp.data.result], // Store images in state
        }));
  
        images.push(resp.data.result);
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setImageList(images);
        setloading(false);
      }
    }
  };
  




  useEffect(() => {
    if (videoData?.videoScript && videoData?.audiofileUrl && videoData?.captions && videoData?.imagesUrl) {
      console.log("Saving Video Data:", videoData);
      SaveVideoData(videoData);
    } else {
      console.log("Error in useEffect: Missing fields", videoData);
    }
  }, [videoData]);
  





  //Method-->jo hmare Database mai,,store krayega Data,,table name se data jaata hai
  const SaveVideoData = async (videoData) => {
    setloading(true);
  
    try {
      if (
        !videoData?.videoScript ||
        !Array.isArray(videoData.imagesUrl) ||
        videoData.imagesUrl.length !== 4
      ) {
        console.error("Error: Missing videoScript or exactly 4 image URLs required.", videoData);
        return;
      }
  
      const result = await db_VAR.insert(videoDataTableName)
        .values({
          videoScript: videoData.videoScript,
          audiofileUrl: videoData.audiofileUrl || "",
          captions: videoData.captions || [],
          imagesUrl: videoData.imagesUrl, // Must be an array of 5 URLs
          createdBy:user?.primaryEmailAddress?.emailAddress
        })
        .returning();
  
      console.log("Saved data:", result);
      setvideoIdValue(result[0].id);
      setplayVideoValue(true)

    } catch (error) {
      console.error("Error saving video data:", error);
    } finally {
      setloading(false);
    }
  };


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
      <PlayerDialog playVideo={playVideoValue} videoId={videoIdValue}/>

    </div>
  );
}

export default CreateNewVideo;
