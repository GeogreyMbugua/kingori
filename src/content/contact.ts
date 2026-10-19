import type { ContactContent } from "@/types/content";

export const contactContent: ContactContent = {
  status: "placeholder",
  title: "Book",
  description: "Book Dr. King'ori, or introduce a guest.",
  invitation: "Name a date.",
  note: "For a talk, a hosting job, or a guest you want in the chair. Say who, say what you want to ask, and say when you can record.",
  // example.com is reserved for documentation and can never receive mail.
  primary: { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
  secondary: [],
};
