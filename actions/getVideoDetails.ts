"use server"
import {google} from "googleapis";
import {VideoDetails} from "@/types/types"


const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
})

export async function getVideoDetails(videoId: string){
    console.log("Fetching video details for ",videoId)
    try{
        const videoResponse = youtube.videos.list({
            part:["statistics","snippet"],
            id:[videoId]
        })
        const videoDetails= (await videoResponse).data.items?.[0]
        if(!videoDetails) throw new Error ("video not found")

        const channelResponse = await youtube.channels.list({
            part:["snippet","statistics"],
            id:[videoDetails.snippet?.channelId || ""],
            key: process.env.YOUTUBE_API_KEY
        })
        

        const channelDetails = channelResponse.data.items?.[0]

        const video:VideoDetails={
            //video info
            title: videoDetails.snippet?.title || "Unknown Title",
            thumbnail: videoDetails.snippet?.thumbnails?.maxres?.url ||
                       videoDetails.snippet?.thumbnails?.high?.url ||
                       videoDetails.snippet?.thumbnails?.default?.url || 
                       "",
            publishedAt: videoDetails.snippet?.publishedAt || new Date().toISOString(),
            //video metrics
            views: videoDetails.statistics?.viewCount || "0",
            likes: videoDetails.statistics?.dislikeCount || "Not Available",
            comments: videoDetails.statistics?.commentCount || "Not available",

            //channel info
            channel:{
                title: videoDetails.snippet?.channelTitle || "Unknown Title",
                thumbnail: channelDetails?.snippet?.thumbnails?.default?.url || "",
                subscribers: channelDetails?.statistics?.subscriberCount || "0"

            }
        }
            console.log(video)
        return video;

    }catch(err){
        console.error("error fetching details:",err)
        return null
    }
}
