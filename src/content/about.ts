import type { AboutContent } from "@/types/content";

export const aboutContent: AboutContent = {
  status: "placeholder",
  title: "About",
  description: "About Kingori.",
  statement:
    "A first-person statement of identity: one or two sentences that sound like Kingori and no one else.",
  portrait: { kind: "pending", media: "image", description: "Portrait, environmental" },
  detail: { kind: "pending", media: "image", description: "Detail: hands, tools or workspace" },
  chapters: [
    {
      heading: "Perspective",
      body: [
        "How Kingori sees the work: the questions that keep returning, and the point of view that connects different projects.",
      ],
    },
    {
      heading: "Approach",
      body: [
        "How the work gets made: process, collaboration and the standards held along the way.",
        "A second paragraph can describe a typical way of working with others, in plain terms.",
      ],
    },
    {
      heading: "Experience",
      body: [
        "A short narrative of the path so far. Real names, places and dates are added only when supplied.",
      ],
    },
  ],
  capabilitiesHeading: "What I do",
  capabilities: ["Capability one", "Capability two", "Capability three", "Capability four"],
};
