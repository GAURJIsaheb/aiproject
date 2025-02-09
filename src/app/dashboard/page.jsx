"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { db_VAR } from "../../../configs/db";
import { videoDataTableName } from "../../../configs/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import VideoList from "./_components/VideoList";
// import { Loader2 } from "lucide-react";
import Image from "next/image";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [videolist, setvideolist] = useState([]);
  const { user } = useUser();

  const getVideoList = async () => {
    setLoading(true);
    const resp = await db_VAR
      .select()
      .from(videoDataTableName)
      .where(eq(videoDataTableName?.createdBy, user?.primaryEmailAddress?.emailAddress));

    setvideolist(resp);
    setLoading(false);
  };

  useEffect(() => {
    getVideoList();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center space-y-4">
          {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50">
          <Image src="/loading.gif" alt="Loading..." width={320} height={320} className="animate-pulse" />
          </div>
)}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="space-y-2 text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage and create your video content
            </p>
          </div>
          
          <Link href="/dashboard/create-new">
            <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
              Create New Video
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Total Videos</h3>
            <p className="text-3xl font-bold mt-2">{videolist.length}</p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Recent Activity</h3>
            <p className="text-3xl font-bold mt-2">
              {videolist.filter(v => new Date(v.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Last 7 days</p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Storage Used</h3>
            <p className="text-3xl font-bold mt-2">0 GB</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-card rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Your Videos</h2>
            <Button variant="outline" onClick={() => getVideoList()}>
              Refresh
            </Button>
          </div>
          
          {videolist.length === 0 ? (
            <EmptyState />
          ) : (
            <VideoList VideoListData={videolist} SetVideoListData={setvideolist} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;