/* ==========================================================================
   SITE CONTENT: edit this file to update projects and contact links.
   Everything the page renders dynamically comes from here.
   ========================================================================== */

window.SITE_CONTENT = {
  // Main Behance profile, used by "See all projects on Behance" and Contact.
  behanceProfile: "https://www.behance.net/anursudheesh",

  contact: {
    email: "anusudheesh32@gmail.com",
    phone: "8301950895",       // shown on the page
    phoneHref: "8301950895",   // used in the tel: link (add a country code like +91 if you like)
    linkedin: "https://www.linkedin.com/in/anu-r-sudheesh-792143170/",
  },

  /* Selected Work cards.
     - cover: path to an image in /img (swap the SVG placeholders for real
       JPG/PNG/WebP covers, ideally 1600x1200, 4:3).
     - alt:   describe the cover image for screen reader users.
     - tags:  short labels shown on the card.
     - url:   the project page on Behance. */
  projects: [
    {
      title: "[Project 1 name]",
      description: "One-line description of the project, the problem and your role.",
      tags: ["Product Design", "Figma"],
      cover: "/img/cover-1.svg",
      alt: "Placeholder cover for Project 1",
      url: "https://www.behance.net/anursudheesh",
    },
    {
      title: "[Project 2 name]",
      description: "One-line description of the project, the problem and your role.",
      tags: ["Game UI/UX", "Unity"],
      cover: "/img/cover-2.svg",
      alt: "Placeholder cover for Project 2",
      url: "https://www.behance.net/anursudheesh",
    },
    {
      title: "[Project 3 name]",
      description: "One-line description of the project, the problem and your role.",
      tags: ["XR Interaction", "Prototyping"],
      cover: "/img/cover-3.svg",
      alt: "Placeholder cover for Project 3",
      url: "https://www.behance.net/anursudheesh",
    },
  ],
};
