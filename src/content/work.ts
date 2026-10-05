import type { CollectionPageContent, Project } from "@/types/content";

export const workContent: CollectionPageContent = {
  status: "placeholder",
  title: "Work",
  description: "Selected projects by Kingori.",
  intro:
    "A short framing line for the body of work: what connects these projects, and how to read them.",
  emptyMessage: "No projects have been published yet.",
};

/**
 * Development dataset: three placeholder projects with deliberately different
 * shapes (image-led, typography-led, case study) so every composition is
 * reviewable. Copy describes what belongs in each field; it makes no claims
 * about real work. Replace entry by entry with real projects.
 *
 * Array order is editorial order.
 */
export const projects: readonly Project[] = [
  {
    status: "placeholder",
    slug: "image-study",
    title: "Light Studies",
    summary:
      "One or two sentences introducing the project: what it is and the idea at its centre.",
    category: "Photography",
    year: 2026,
    role: ["Concept", "Photography"],
    cover: { kind: "pending", media: "image", description: "Lead photograph" },
    coverRatio: "3:2",
    overview: [
      "The overview opens the project in a single, confident paragraph. It sets the scene, names the subject and tells the reader why the work exists, in plain language and without superlatives.",
      "A second paragraph can add context: where the work sits in a larger practice, what it responds to, or how it was made. Two paragraphs is usually enough for an image-led project; the photographs carry the rest.",
    ],
    figures: [
      {
        asset: { kind: "pending", media: "image", description: "Wide establishing image" },
        ratio: "21:9",
      },
      {
        asset: { kind: "pending", media: "image", description: "Portrait detail" },
        ratio: "4:5",
        caption: "Captions name what is shown, briefly.",
      },
      {
        asset: { kind: "pending", media: "image", description: "Close crop, texture" },
        ratio: "4:5",
      },
      {
        asset: { kind: "pending", media: "image", description: "Closing image" },
        ratio: "16:9",
      },
    ],
    relatedSlugs: ["written-piece", "process-study"],
  },
  {
    status: "placeholder",
    slug: "written-piece",
    title: "A Written Piece",
    summary: "A project led by words: the summary states its subject in one clear sentence.",
    category: "Writing",
    year: 2025,
    role: ["Writing", "Editorial direction"],
    cover: { kind: "pending", media: "image", description: "Single supporting image" },
    coverRatio: "1:1",
    statement:
      "A single line from the work, set large enough to carry the page on its own.",
    overview: [
      "Typography-led projects begin with their own words. This overview is longer, because the text is the work: it introduces the piece, the question it asks and the voice it is written in.",
      "Paragraphs here should read comfortably at a book-like measure. They can quote, digress and return; the layout gives them room rather than breaking them into fragments.",
      "A third paragraph tests how the page handles sustained reading before the next interruption, and confirms that rhythm holds when the content grows.",
    ],
    relatedSlugs: ["image-study"],
  },
  {
    status: "placeholder",
    slug: "process-study",
    title: "From Sketch to Final",
    summary:
      "A case study showing how a project developed, from first question to finished piece.",
    category: "Design",
    year: 2024,
    role: ["Research", "Design", "Production"],
    cover: { kind: "pending", media: "image", description: "Finished piece in context" },
    coverRatio: "16:9",
    overview: [
      "The overview summarises the whole case study in a paragraph, so a reader who stops here still understands the project.",
    ],
    challenge: [
      "The challenge states the problem the project set out to address, in the client's or audience's terms rather than the designer's.",
      "It names constraints honestly: time, material, audience or brief.",
    ],
    approach: [
      "The approach describes the decisions taken and why: what was tried, what was kept, and what was discarded along the way.",
      "Process images sit beside this section, so the narrative and the evidence are read together.",
    ],
    outcome: [
      "The outcome describes what was made and how it is used, without invented metrics. If results are shared, they are quoted exactly as supplied.",
    ],
    figures: [
      {
        asset: { kind: "pending", media: "image", description: "Early sketch" },
        ratio: "3:4",
        caption: "Process captions explain the stage shown.",
      },
      {
        asset: { kind: "pending", media: "image", description: "Iteration, side by side" },
        ratio: "3:2",
      },
      {
        asset: { kind: "pending", media: "image", description: "Final piece, full frame" },
        ratio: "21:9",
      },
    ],
    relatedSlugs: ["image-study"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project): readonly Project[] {
  return (project.relatedSlugs ?? []).flatMap((slug) => getProjectBySlug(slug) ?? []);
}
