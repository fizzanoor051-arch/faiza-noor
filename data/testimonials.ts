export interface Testimonial {
  id: string;
  type: "honest-placeholder";
  quote: string;
  author: string;
  role: string;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "feedback-coming",
    type: "honest-placeholder",
    quote:
      "Verified client feedback will be added here as professional client projects and collaborations grow.",
    author: "Future Client Feedback",
    role: "Verified project collaboration",
    verified: false,
  },
];

export const testimonialMessage = {
  title: "Proof over promises.",
  description:
    "This portfolio does not use invented testimonials, fake client names, or manufactured success stories. Verified feedback will be added as real professional collaborations grow.",
  label: "HONEST BY DESIGN",
};