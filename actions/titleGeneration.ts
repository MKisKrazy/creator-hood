"use server";

import { api } from "@/convex/_generated/api";
import { FeatureFlag, featureFlagEvents } from "@/features/flags";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const convexClient = getConvexClient();

export async function titleGeneration(
  videoId: string,
  videoSummary: string,
  considerations: string
) {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not found");
  }

const apiKey= process.env.GEMINI_API_KEY || ""

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001",
    systemInstruction:"You are a helpful YouTube video creator assistant that creates high quality SEO friendly concise video titles."
 });

const prompt = `Please provide ONE concise YouTube title (and nothing else) for this video. Focus on the main points and key takeaways, it should be SEO friendly and 100 characters or less:\n\n${videoSummary}\n\n${considerations}`;

  try {
    console.log("🎯 Video summary:", videoSummary);
    console.log("🎯 Generating title for video for videoId:", videoId);
    console.log("🎯 Considerations:", considerations);

    const result = await model.generateContent(prompt);


    const title =
    result.response.text()  || "Unable to generate title";
      console.log(title)

    if (!title) {
      return {
        error: "Failed to generate title (System error)",
      };
    }

    await convexClient.mutation(api.titles.generate, {
      videoId,
      userId: user.id,
      title: title,
    });

    await client.track({
      event: featureFlagEvents[FeatureFlag.TITLE_GENERATIONS].event,
      company: {
        id: user.id,
      },
      user: {
        id: user.id,
      },
    });

    console.log("🎯 Title generated:", title);

    return title;
  } catch (error) {
    console.error("❌ Error generating title:", error);
    throw new Error("Failed to generate title");
  }
}