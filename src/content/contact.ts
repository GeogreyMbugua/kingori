import type { ContactContent } from "@/types/content";

export const contactContent: ContactContent = {
  status: "placeholder",
  title: "Contact",
  description: "How to get in touch with Kingori.",
  invitation: "Start a conversation.",
  note: "A sentence on what to get in touch about and how soon to expect a reply.",
  // example.com is reserved for documentation and can never receive mail.
  primary: { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
  secondary: [],
};
