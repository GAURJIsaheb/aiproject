"use client";
import React, { useState } from 'react';
import SelectTopic from './_components/SelectTopic';
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';

function CreateNewVideo() {
  const [formDataa, setformdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [videoScriptData, setvideoScriptData] = useState();
  const [audioUrl, setAudioUrl] = useState(null);

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

  // Get video Script from API --> /api/get-video-script
  const GetVideoScript = async () => {
    setloading(true);
    const Makeprompt =
      'Write a script to generate ' +
      formDataa.duration +
      ' seconds video on topic:' +
      formDataa.topic +
      ' along with AI image prompt in ' +
      formDataa.imageStyle +
      ' format for each scene and give me result in JSON format with imagePrompt and ContextText as fields';
    const result = await axios
      .post('/api/get-video-script', {
        prompt: Makeprompt
      })
      .then((res) => {
        console.log(res.data.result);
        setvideoScriptData(res.data.result);
        GenerateAudioScriptFile(res.data.result);
      });
    setloading(false);
  };

  const GenerateAudioScriptFile = async (videoScriptData) => {
    setloading(true);

    try {
      let script = '';
      const uniqueId = uuidv4();

      videoScriptData?.video_script?.forEach((item) => {
        script += item.contextText + ' ';
      });

      const response = await axios.post('/api/get-textTOspeech', {
        script: script,
        id: uniqueId
      });

      if (response.status === 200) {
        const { audioUrl } = response.data;
        setAudioUrl(audioUrl); // Save URL for playback/download
      } else {
        console.error('Failed to generate audio:', response.data);
      }
    } catch (error) {
      console.error('Error generating audio script:', error.message || error);
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
    </div>
  );
}

export default CreateNewVideo;
