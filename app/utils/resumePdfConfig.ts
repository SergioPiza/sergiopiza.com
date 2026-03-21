import type { resumeData } from "~/data/resume";

type ResumeData = typeof resumeData;

const SECTION_COLOR = "#2d5282";
const BODY = 10;
const SECTION = 11;

const PAGE_WIDTHS: Record<string, number> = {
  LETTER: 612,
  A4: 595.28,
  LEGAL: 612,
  TABLOID: 792,
};

function contentWidth(pageSize: string, margins: number): number {
  return (PAGE_WIDTHS[pageSize] ?? 595.28) - margins * 2;
}

function sectionHeader(title: string, lineWidth: number) {
  return [
    {
      text: title,
      fontSize: SECTION,
      bold: true,
      color: SECTION_COLOR,
      margin: [0, 10, 0, 1],
    },
    {
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: lineWidth,
          y2: 0,
          lineWidth: 0.5,
          lineColor: SECTION_COLOR,
        },
      ],
      margin: [0, 0, 0, 4],
    },
  ];
}

export function buildResumeDocDef(resume: ResumeData, pageSize = "A4") {
  const margins = 48;
  const lineW = contentWidth(pageSize, margins);
  const sh = (title: string) => sectionHeader(title, lineW);

  return {
    pageSize,
    pageMargins: [margins, 36, margins, 36],
    defaultStyle: {
      fontSize: BODY,
      lineHeight: 1.2,
      color: "#111111",
    },
    content: [
      // ── HEADER ────────────────────────────────────────────────────────────
      {
        columns: [
          {
            stack: [
              {
                text: resume.contact.website,
                fontSize: 9.5,
                link: resume.contact.websiteHref,
                color: "#111111",
              },
              {
                text: resume.contact.email,
                fontSize: 9.5,
                link: resume.contact.emailHref,
                color: "#111111",
              },
            ],
            width: "24%",
          },
          {
            text: resume.name,
            fontSize: 20,
            bold: false,
            alignment: "center",
            width: "*",
          },
          {
            stack: [
              {
                text: resume.contact.linkedin,
                fontSize: 9.5,
                alignment: "right",
                link: resume.contact.linkedinHref,
                color: "#111111",
              },
              {
                text: resume.contact.github,
                fontSize: 9.5,
                alignment: "right",
                link: resume.contact.githubHref,
                color: "#111111",
              },
            ],
            width: "24%",
          },
        ],
        margin: [0, 0, 0, 2],
      },

      // ── PROFESSIONAL SUMMARY ──────────────────────────────────────────────
      ...sh("Professional Summary"),
      {
        ul: resume.summary,
        fontSize: BODY,
        margin: [0, 2, 0, 0],
      },

      // ── EDUCATION ─────────────────────────────────────────────────────────
      ...sh("Education"),
      ...resume.education.map((edu) => ({
        columns: [
          {
            text: [
              { text: edu.degree, bold: true },
              { text: `, ${edu.institution}` },
            ],
            width: "*",
            fontSize: BODY,
          },
          {
            text: edu.period,
            bold: true,
            alignment: "right",
            width: "auto",
            fontSize: BODY,
          },
        ],
        margin: [0, 2, 0, 0],
      })),

      // ── WORK EXPERIENCE ───────────────────────────────────────────────────
      ...sh("Work Experience"),
      ...resume.experience.flatMap((job) => [
        {
          columns: [
            {
              text: [
                { text: job.role, bold: true },
                { text: ` - ${job.company}` },
              ],
              width: "*",
              fontSize: BODY,
            },
            {
              text: job.period,
              bold: true,
              alignment: "right",
              width: "auto",
              fontSize: BODY,
            },
          ],
          margin: [0, 2, 0, 0],
        },
        {
          ul: job.bullets,
          fontSize: BODY,
          margin: [2, 1, 0, 0],
        },
      ]),

      // ── PROJECTS ──────────────────────────────────────────────────────────
      ...sh("Projects"),
      ...resume.projects.flatMap((project) => [
        {
          columns: [
            { text: project.name, bold: true, width: "*", fontSize: BODY },
            {
              text: project.period,
              bold: true,
              alignment: "right",
              width: "auto",
              fontSize: BODY,
            },
          ],
          margin: [0, 2, 0, 0],
        },
        {
          ul: project.bullets,
          fontSize: BODY,
          margin: [0, 1, 0, 0],
        },
      ]),

      // ── CERTIFICATIONS ────────────────────────────────────────────────────
      ...sh("Certifications"),
      {
        ul: resume.certifications.map((cert) => ({
          columns: [
            {
              text: cert.name,
              width: "*",
              ...("href" in cert && cert.href ? { link: cert.href } : {}),
            },
            { text: cert.date, bold: true, alignment: "right", width: 56 },
          ],
        })),
        fontSize: BODY,
        margin: [0, 2, 0, 0],
      },

      // ── PROGRAMMING LANGUAGES AND TECHNOLOGIES ────────────────────────────
      ...sh("Programming Languages and Technologies"),
      {
        ul: resume.technologies.map((tech) => ({
          text: [
            { text: `${tech.category}: `, bold: true },
            { text: tech.items },
          ],
        })),
        fontSize: BODY,
        margin: [0, 2, 0, 0],
      },

      // ── LANGUAGES ─────────────────────────────────────────────────────────
      ...sh("Languages"),
      {
        columns: resume.languages.map((lang) => ({
          text: [
            { text: `${lang.level}  `, bold: true },
            { text: lang.language },
          ],
          width: "*",
          fontSize: BODY,
        })),
        margin: [0, 2, 0, 0],
      },
    ],
  };
}
