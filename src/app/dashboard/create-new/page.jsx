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
import { schema_var, videoDataTableName } from '../../../../configs/schema';
import PlayerDialog from '../_components/PlayerDialog';
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { eq } from 'drizzle-orm';

function CreateNewVideo() {
  const [formDataa, setformdata] = useState({});
  const [loading, setloading] = useState(false);
  const [videoScriptData, setvideoScriptData] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [captions,setcaptions]=useState(null);
  
  //To Play Video
  const[playVideoValue,setplayVideoValue]=useState(false)
  const[videoIdValue,setvideoIdValue]=useState(null)


  //use context
  const {videoData,setvideoData}=useContext(VideoDataContext);

  //getting user email/id  from clerk:jis bhi id se sign in hua ho user
  const {user}=useUser();

  //TO Check ki Image Generate krne se pehle,,ki Credits Buche hain ya nhi
  const {userDetail,setuserDetail}=useContext(UserDetailContext);
  const [showPopup, setShowPopup] = useState(false);//to show popup



  const HandleSubmitButton = () => {
    console.log("Credits:",userDetail.credits)
    if(userDetail.credits<9){//Image Generate krne se pehle,,ki Credits Buche hain ya nhi,,1 video k liye 10 Credits use honge
      setShowPopup(true);
      return;
    }
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
       






       
    resp?.data?.result && await generateImage(videoScriptData);

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
    const maxImages = formDataa.duration === "2" ? 2 : 4; // 10s → 2 images, 20s → 4 images
    const limitedScriptData = videoScriptData.slice(0, maxImages); // Limit script data to required images

    for (const element of limitedScriptData) {
      try {
        const resp = await axios.post('/api/generate-images', {
          promptdata: element.imagePrompt,
        });

        images.push(resp.data.result); // Store generated image URLs
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }

    setvideoData((prev) => ({
      ...prev,
      imagesUrl: images, // Store all images in one array for a single video
    }));

    setImageList(images);
    setloading(false);

    // Trigger video creation after all images are generated
    //->generateVideo(images);
};

/*This will generate:
✅ 2 images for 10 seconds
✅ 4 images for 20 seconds */





  useEffect(() => {
    if (videoData?.videoScript && videoData?.audiofileUrl && videoData?.captions && videoData?.imagesUrl) {
      console.log("Saving Video Data:", videoData);
      SaveVideoData(videoData);

      UpdateUserDetails();

    } else {
      console.log("Error in useEffect: Missing fields", videoData);
    }
  }, [videoData]);
  





  //Method-->jo hmare Database mai,,store krayega Data,,table name se data jaata hai
  const SaveVideoData = async (videoData) => {
    if (!videoScriptData && (!imageURLs || imageURLs.length !== 4)) {
      setloading(true); // Show loading instead of error
      return;
    }
    try {
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
      setvideoIdValue(result[0]?.id);
      setplayVideoValue(true);

    } catch (error) {
      console.error("Error saving video data:", error);
    } finally {
      setloading(false);
    }
  };


  //Method -->jO CREDITS,,cut krega,,hr video bnane pr
  const UpdateUserDetails=async()=>{
    const resp=await db_VAR.update(schema_var).set({
      credits:userDetail?.credits-10 //10 Minus after 1 video Gneration
    }).where(eq(schema_var.email,user?.primaryEmailAddress?.emailAddress))

    setuserDetail(prev=>({
      ...prev,
      "credits":userDetail?.credits-10 //update in Database
    }))
  }


  return (
    <div className="relative md:px-20 mt-[25px]">
    {/* Background content blur */}
    {showPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10" />
    )}
  
    {/* Main content with optional blur effect */}
    <div className={`${showPopup ? 'blur-sm pointer-events-none' : ''}`}>
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
      <PlayerDialog playVideo={playVideoValue} videoId={videoIdValue} />
    </div>
  
    {/* The Popup (on top of all content, not blurred) */}
    {showPopup && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
          <h2 className="text-xl font-bold text-red-600">No Credits Left!!</h2>
          <p className="text-gray-700 mt-2">You need at least 10 credits to generate a video.</p>
          <button
            onClick={() => setShowPopup(false)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    )}
  </div>
  

  );
}

export default CreateNewVideo;
