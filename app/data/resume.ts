import { technologies } from "./profile"

export const resumeData = {
  name: "Sergio C. de Toledo Piza",
  role: "Data Engineer and Backend Developer",
  contact: {
    website: "sergiopiza.com",
    websiteHref: "https://sergiopiza.com",
    email: "sergio@sergiopiza.com",
    emailHref: "mailto:sergio@sergiopiza.com",
    linkedin: "linkedin.com/in/sergiopiza",
    linkedinHref: "https://www.linkedin.com/in/sergiopiza/",
    github: "github.com/sergiopiza",
    githubHref: "https://github.com/sergiopiza"
  },
  summary: [
    "Data and Software Engineer with 5+ years building scalable data pipelines, backend services, and data governance solutions.",
    "Strong expertise in Scala, Python, Spark, SQL, AWS, Databricks, Terraform, and TypeScript applied to distributed systems, ETL workflows, IaC, and batch/stream data processing.",
    "Experienced with data lakehouse architecture, PII/data governance, regulatory reporting, and performance optimization across multi-country operations.",
    "Proven experience implementing full-stack backend solutions: webhook ingestion, API integrations, data lakehouse development, and business-critical reporting for financial institutions.",
    "Used to owning projects end-to-end: architectural design, development, IaC, deployment, monitoring, and continuous improvements based on user/product needs.",
    "I care about delivering everything in the best way possible. I work closely with teammates and stakeholders and deliver solutions that solve real problems not only for the clients, but also for my peers."
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of São Paulo",
      period: "Aug 2017 — Dec 2022"
    }
  ],
  experience: [
    {
      role: "Data Engineer",
      company: "Clara",
      period: "Jan 2023 — Present",
      summary: "Worked on backend features, integrations, and web application flows as part of my first professional software role.",
      bullets: [
        "Collaborated in building and maintaining the data lakehouse of a large expense management solution serving Brazil, Mexico, and Colombia; designed and implemented high-performance ETL pipelines using Scala, Python, Spark, AWS, Databricks, Terraform and Airflow.",
        "Architected and implemented a declarative PII masking system using Databricks Unity Catalog ABAC policies and Terraform, replacing legacy write-time masking with query-layer enforcement. Designed config-as-code YAML definitions, SQL masking UDFs, and conditional masking strategies (person vs. company) across 12,000+ PII findings in 5,500+ tables for Brazil, Mexico, and Colombia.",
        "Delivered ETL pipelines under Medallion Architecture (Bronze/Silver/Gold) for multiple data providers, including DMS migrations and AutoLoader integrations.",
        "Built webhook-based processing flows triggered via AWS API Gateway endpoints, using AWS Lambda to asynchronously process onboarding events and ingest structured payloads to S3.",
        "Implemented regulatory reporting pipelines for Bacen (Brazilian Central Bank) and AML (Anti-Money Laundering) reports for government institutions in Mexico and Brazil, as well as transaction reports for credit companies in Colombia and Brazil.",
        "Optimized data processing jobs with date partition reading, reducing execution times by 35%, saving costs while ensuring data quality.",
        "Independently initiated and implemented multiple projects to improve the work experience of the Data team, including a customized Slack notification bot for the service desk, an automated ETL project template generator, and a VS Code extension for DLT SQL with full IDE support (go-to-definition, autocomplete, rename/refactor, diagnostics) for the team's 1,500+ SQL model codebase."
      ],
      stack: [technologies.Scala, technologies.Python, technologies.Spark, technologies.AWS, technologies.Databricks, technologies.Terraform, technologies.Airflow]
    },
    {
      role: "Business Intelligence Analyst",
      company: "Itaú Unibanco",
      period: "Oct 2022 — Jan 2023",
      summary: "Built dashboards and ETL flows for an operations team that needed clearer visibility into process efficiency and costs.",
      bullets: [
        "Developed dashboards and their ETL pipelines to bring data-driven insights to the operations of the Printing and Tangible Efficiency Team of the largest bank in Latam analyzing business processes and collecting and interpreting data from various sources.",
        "Utilized tools such as Python for data extraction, cleaning, and transformation, and Excel for data analysis and creating dashboards.",
        "Identified pain points and presented actionable recommendations to improve KPIS related to cost-effectiveness."
      ],
      stack: [technologies.Python, technologies.Excel, technologies.ETL, technologies.Dashboarding]
    },
    {
      role: "Software Engineer",
      company: "Itaú Unibanco",
      period: "Jan 2022 — Oct 2022",
      summary: "Worked on automation, logistics systems, and operational analytics for banking processes that depended on fewer manual steps and better visibility.",
      bullets: [
        "Performed process automations, system improvements and data analysis for the largest bank in LATAM; utilized SQL, Python and C#.",
        "Developed process automations for the Tangible Logistics team, working on projects such as Invoice Delivery, Credit Card Password Delivery, Card Retention, and Invoicing Controls, monitoring service desk and automation availability indicators, and generating dashboards for analysis and daily reports.",
        "Conducted data processing and database generation for analysis utilizing SQL and Python and integration with dashboards created on Excel."
      ],
      stack: [technologies.SQL, technologies.Python, technologies.CSharp, technologies.Automation]
    },
    {
      role: "Full Stack Developer",
      company: "Nova Singular",
      period: "Jan 2017 — Jul 2017",
      summary: "Worked on backend features, integrations, and web application flows as part of my first professional software role.",
      bullets: [
        "Responsible for building and maintaining the server side of websites. Worked with database management and on the implementation of several different processes, including login systems, form validation and website internationalization. I was also responsible for the integration of these processes with the front-end."
      ],
      "stack": [technologies.Node_js, technologies.WebDevelopment, technologies.Databases]
    }
  ],
  projects: [
    {
      name: "Gestão Atlas (Atlas Management)",
      period: "Jun 2020 — Jan 2022",
      bullets: [
        "Gestão Atlas is a Node.js Express-based strategic planning system that enables registered employees to receive and mark their completed tasks. It provides performance feedback to users, tracks incomplete tasks and informs about future ones. The system can generate individual PDF reports for specific areas or employees. Our clients have been successfully served for over a year."
      ]
    }
  ],
  certifications: [
    { name: "Certificate of Special Studies in Data Science (450h) - University of São Paulo", date: "Feb 2023" },
    { name: "University Extension Course: VI Advanced School in Big Data Analysis - University of São Paulo", date: "Nov 2022" },
    { name: "Data Engineering using Databricks on AWS and Azure - Udemy", date: "Set 2022", href: "https://www.udemy.com/certificate/UC-9197bbfc-7f11-4095-80b4-a04f9bff7546/" }
  ],
  technologies: [
    { category: "Programming Languages", items: "Scala, Python, SQL, TypeScript, JavaScript, C, Java, C#" },
    { category: "Databases & Storage", items: "AWS Redshift, PostgreSQL, AWS S3, Delta Lake, MongoDB" },
    { category: "Data & Orchestration Tools", items: "Spark, Databricks (Unity Catalog, DLTs, AutoLoader), Airflow, AWS (Glue, API Gateway, CloudFormation, DMS, Lambda)" },
    { category: "Visualization Tools", items: "Tableau, Quicksight, Databricks Dashboards" },
    { category: "Cloud & IaC", items: "AWS, Azure, Terraform" },
    { category: "Others", items: "Git, Node.JS, VS Code Extension API" }
  ],
  languages: [
    { level: "Native", language: "Portuguese" },
    { level: "Fluent", language: "English" },
    { level: "Basic", language: "Spanish" }
  ]
}
