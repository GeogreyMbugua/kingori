import type { HomeContent } from "@/types/content";

/** The archive is organised by the questions a conversation belongs to. */
export const archiveThemes = ["Money", "Power", "People", "Society", "Life", "Taboos"] as const;

export const homeContent: HomeContent = {
  status: "placeholder",
  title: "Kingori",
  intro: "Sit with the long answer.",
  feature: {
    kind: "image",
    src: "/images/people/im01.png",
    width: 976,
    height: 1220,
    alt: "Dr. King'ori standing in a blue suit and holding a microphone on stage.",
    transparent: true,
  },
  detail: {
    kind: "image",
    src: "/images/people/port-6.png",
    width: 1080,
    height: 1080,
    alt: "Dr. King'ori and a woman looking together at a phone across a desk.",
    transparent: true,
  },
  statement: {
    lead: "Conversations that go",
    accent: "beyond",
    tail: "the obvious.",
  },
  featuredHeading: "Now playing",
  archiveHeading: "Threads",
  archiveIntro: "",
  behindHeading: "Off mic",
};
