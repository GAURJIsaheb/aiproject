"use client"
import React, { useEffect, useState } from 'react'
import { Player } from "@remotion/player";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import RemotionVideo from './RemotionVideo';
import { Button } from '@/components/ui/button';
import { db_VAR } from '../../../../configs/db';
import { videoDataTableName } from '../../../../configs/schema';
import { eq } from 'drizzle-orm';


function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setopenDialog] = useState(false)
  const [fetchedData, setfetchedData] = useState();
  //to get the length of our video accurately
  const[frameValues,setframeValues]=useState(100)
  

  useEffect(() => {
    setopenDialog(playVideo)

    videoId && GetVideoData();
  }, [playVideo])


  //to fetch data from the Database
  const GetVideoData = async () => {
    const result = await db_VAR.select().from(videoDataTableName)
      .where(eq(videoDataTableName.id, videoId));//DB mai jo id equal to aa rhi videoId k,, vo fetch krlo,, eq drizzle se imported hai

    console.log("Fetched Result is:", result);
    setfetchedData(result[0])
  }

  return (
    <Dialog  open={openDialog}>

      <DialogContent className="justify-center">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold justify-center text-center my-5">Requested Video :</DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>
        <Player
          component={RemotionVideo}
          durationInFrames={Number(frameValues.toFixed(0))}
          compositionWidth={300}
          compositionHeight={450}
          fps={30}
          controls={true}
          inputProps={
            {
              ... fetchedData,
              setTotalduration:(Totalduration)=>setframeValues(Totalduration)
              
            }
          }
        />
        <div className="flex justify-center gap-10">
          <Button>Cancel</Button>
          <Button className="bg-purple-700">Export</Button>
        </div>

      </DialogContent>
    </Dialog>

  )
}

export default PlayerDialog