import type { AboutContent } from "@/types/content";
import type { InformativeImage } from "@/types/media";

/** Photographs for the About strip. Crops keep the person in frame. */
export const aboutPhotographs: readonly InformativeImage[] = [
  {
    kind: "image",
    src: "/images/animated/g1.jpg",
    width: 1440,
    height: 1914,
    alt: "Dr. King'ori standing with a child on a paved courtyard, holding her hand.",
  },
  {
    kind: "image",
    src: "/images/animated/g2.jpg",
    width: 1440,
    height: 1806,
    alt: "Dr. King'ori seated on blue studio steps beside a woman, in front of a night-time city backdrop.",
  },
  {
    kind: "image",
    src: "/images/animated/g3.jpg",
    width: 1638,
    height: 2048,
    alt: "Dr. King'ori in a blue windowpane suit, hands in his pockets, against a dark studio wall.",
  },
  {
    kind: "image",
    src: "/images/animated/g4.jpg",
    width: 1440,
    height: 1220,
    alt: "Dr. King'ori looking down at a page, holding a microphone, outside a stone building.",
    focalPoint: { x: 42, y: 42 },
  },
  {
    kind: "image",
    src: "/images/animated/g5.jpg",
    width: 1440,
    height: 1800,
    alt: "Dr. King'ori seated in a studio, wearing glasses, a black tank top and red trousers.",
  },
  {
    kind: "image",
    src: "/images/animated/g6.jpg",
    width: 2048,
    height: 1365,
    alt: "Dr. King'ori in a maroon dinner jacket holding papers, with cars and a camera behind him.",
    focalPoint: { x: 30, y: 42 },
  },
  {
    kind: "image",
    src: "/images/animated/g7.jpg",
    width: 1440,
    height: 1440,
    alt: "Dr. King'ori in a black suit and red bow tie beside a woman in a black hijab and a red scarf.",
  },
  {
    kind: "image",
    src: "/images/animated/g8.jpg",
    width: 1440,
    height: 1440,
    alt: "Dr. King'ori smiling in a dark suit and red tie, holding a microphone against a black background.",
  },
  {
    kind: "image",
    src: "/images/animated/g9.jpg",
    width: 1440,
    height: 960,
    alt: "Dr. King'ori in a dark suit and red tie, one hand extended, against a black background.",
    focalPoint: { x: 68, y: 48 },
  },
  {
    kind: "image",
    src: "/images/animated/g10.jpg",
    width: 1440,
    height: 1440,
    alt: "Dr. King'ori laughing into a microphone, his arm around a man in a dinner jacket.",
  },
];

export const aboutContent: AboutContent = {
  status: "placeholder",
  title: "About",
  description: "About Dr. King'ori.",
  statement: "Conversations that go beyond the obvious.",
  portrait: {
    kind: "image",
    src: "/images/people/about-portrait.webp",
    width: 1024,
    height: 1365,
    alt: "Dr. King'ori in a dark suit and pink shirt, smiling with his hands clasped.",
    transparent: true,
  },
  detail: { kind: "pending", media: "image", description: "Detail: hands, tools or workspace" },
  chapters: [
    {
      heading: "Show",
      body: [
        "Dr. King'ori (Felix Omondi) hosts long-form conversations on financial literacy, business strategy and the way money, power and people actually move.",
        "After a decade at Nation Media Group with The Wicked Edition, the work continues independently as Grin Content, on YouTube.",
      ],
    },
    {
      heading: "Archive",
      body: [
        "This site is the home of those conversations: a place to watch, to read what they leave behind, and to find a discussion by the question it opens.",
      ],
    },
  ],
  capabilitiesHeading: "The platform",
  capabilities: ["The show", "YouTube", "Writing", "Bookings"],
};
