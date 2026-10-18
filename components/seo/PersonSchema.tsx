
export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Faiza Noor M. Shabbir Hussain",
    jobTitle: "Full-Stack Web Engineer",
    url: "https://faiza-noor10.vercel.app/",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pasrur",
      addressRegion: "Sialkot, Punjab",
      addressCountry: "PK",
    },
    description:
      "The youngest female Full-Stack Web Engineer from District Sialkot, Pakistan, specializing in MERN stack, Next.js, and AI-powered applications.",
    sameAs: [
      "https://www.linkedin.com/in/faiza-noor-b2711b42b/",
      "https://github.com/fizzanoor051-arch",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
