import type { AboutContent } from "@/types/content";

export const aboutContent: AboutContent = {
  status: "placeholder",
  title: "About",
  description: "About Dr. King'ori.",
  statement: "Conversations that go beyond the obvious.",
  portrait: { kind: "pending", media: "image", description: "Portrait, environmental" },
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
