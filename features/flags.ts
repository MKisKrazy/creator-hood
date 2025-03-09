export enum FeatureFlag {
    TRANSCRIPTION = "transcription",
    IMAGE_GENERATION = "image-generation",
    VIDEO_ANALYSIS = "video-analysis",
    TITLE_GENERATIONS = "title-generation",
    SCRIPT_GENERATION = "script-generation",
}

export const featureFlagEvents : Record<FeatureFlag,{event:string}>={
    [FeatureFlag.TRANSCRIPTION]:{
event: "transcribe",
},
[FeatureFlag.IMAGE_GENERATION]: {
event: "generate-image",
},
[FeatureFlag.VIDEO_ANALYSIS]: {
event: "analyse-video",
},
[FeatureFlag.TITLE_GENERATIONS]: {
event: "generate-title",
},
[FeatureFlag.SCRIPT_GENERATION]: {
event: ""
},
}