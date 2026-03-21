export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Wins', href: '#wins' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const extraLinks = [{ label: 'Resume', href: '/resume', icon: 'ph:file-text-bold' }]

export const technologies = {
  Scala: { label: 'Scala', icon: 'simple-icons:scala' },
  Python: { label: 'Python', icon: 'simple-icons:python' },
  Spark: { label: 'Spark', icon: 'simple-icons:apachespark' },
  SQL: { label: 'SQL', icon: 'ph:file-sql-bold' },
  AWS: { label: 'AWS', icon: 'simple-icons:amazonwebservices' },
  Databricks: { label: 'Databricks', icon: 'simple-icons:databricks' },
  Terraform: { label: 'Terraform', icon: 'simple-icons:terraform' },
  Airflow: { label: 'Airflow', icon: 'simple-icons:apacheairflow' },
  TypeScript: { label: 'TypeScript', icon: 'simple-icons:typescript' },
  CSharp: { label: 'C#', icon: 'simple-icons:csharp' },
  Node_js: { label: 'Node.js', icon: 'simple-icons:nodedotjs' },
  Excel: { label: 'Excel', icon: 'simple-icons:microsoftexcel' },
  ETL: { label: 'ETL', icon: 'ph:arrows-clockwise-bold' },
  Dashboarding: { label: 'Dashboarding', icon: 'ph:chart-line-up-bold' },
  Automation: { label: 'Automation', icon: 'ph:gear-six-bold' },
  Databases: { label: 'Databases', icon: 'ph:database-bold' },
  WebDevelopment: { label: 'Web Development', icon: 'ph:globe-bold' },
  Lakehouse: { label: 'Lakehouse', icon: 'ph:database-bold' },
  BatchAndStreamPipelines: { label: 'Batch and stream pipelines', icon: 'ph:git-branch-bold' },
  APIIntegrations: { label: 'API integrations', icon: 'ph:plugs-connected-bold' },
  WebhookIngestion: { label: 'Webhook ingestion', icon: 'ph:webhooks-logo-bold' },
  Lambda: { label: 'Lambda', icon: 'simple-icons:awslambda' },
  S3: { label: 'S3', icon: 'simple-icons:amazons3' },
  Observability: { label: 'Observability', icon: 'ph:binoculars-bold' },
  IaC: { label: 'IaC', icon: 'ph:blueprint-bold' },
  PIIMasking: { label: 'PII masking', icon: 'ph:eye-slash-bold' },
  UnityCatalogABAC: { label: 'Unity Catalog ABAC', icon: 'ph:shield-check-bold' },
  RegulatoryReporting: { label: 'Regulatory reporting', icon: 'ph:files-bold' },
  AMLPipelines: { label: 'AML pipelines', icon: 'ph:shield-warning-bold' },
  DataQuality: { label: 'Data quality', icon: 'ph:check-circle-bold' },
} as const

export const profile = {
  firstName: 'Sergio',
  lastName: 'Piza',
  role: 'Data Engineer and Backend Developer',
  heroTitle: "Hello, I'm Sergio!",
  heroSummary:
    'I enjoy figuring things out in messy, real-world situations, where trade-offs shape structure and governance, and the goal is to keep things clear and manageable.',
  quickIntro:
    'Over my career, I have worked on multiple international projects involving owning multiple end-to-end batch and streaming ETL pipelines, data governance, internal tooling, REST APIs and regulatory reporting for financial products operating across multiple countries.',
  helloMessages: [
    'Data engineer and backend builder.',
    'Serious PRs, unserious commit messages.',
    'Strong opinions on partitioning, weak opinions on naming.',
    'SLA: “soon”',
    'ChatGPT, write me hilarious data engineering jokes for my website.',
  ],
  contact: {
    email: 'mailto:sergio@sergiopiza.com',
    emailLabel: 'sergio@sergiopiza.com',
    github: 'https://github.com/sergiopiza',
    linkedin: 'https://www.linkedin.com/in/sergiopiza/',
  },
  stats: [
    { value: '5+', label: 'years building software and data systems' },
    { value: '60+', label: 'end-to-end delivered & maintained data pipelines' },
    { value: '12k+', label: 'PII columns governed with policy-driven masking' },
    { value: '35%', label: 'runtime reduction on optimized data jobs' },
  ],
  badges: [
    technologies.Scala,
    technologies.Python,
    technologies.Spark,
    technologies.SQL,
    technologies.AWS,
    technologies.Databricks,
    technologies.Terraform,
    technologies.Airflow,
    technologies.TypeScript,
  ],
  principles: [
    {
      title: 'Production first',
      description:
        'I care about clean architecture, but I care even more about systems that are stable, observable, and easy to operate once they reach production.',
      icon: 'ph:shield-checkered-bold',
    },
    {
      title: 'Team amplifier',
      description:
        'I like building things that help the team move faster too, whether that means better tooling, clearer structure, or less manual work.',
      icon: 'ph:users-three-bold',
    },
    {
      title: 'Governance without drama',
      description:
        'PII, compliance, and reporting work should be straightforward to maintain. I try to make that kind of work reliable, repeatable, and hard to break by accident.',
      icon: 'ph:lock-key-open-bold',
    },
  ],
} as const

export const selectedWins = [
  {
    title: 'Masking policies with fewer sharp edges',
    description:
      'Moved sensitive-data masking from write time to query time, which made governance more flexible and much easier to manage consistently.',
    impact: '12,000+ columns governed across 5,500+ tables',
    icon: 'ph:eye-slash-bold',
  },
  {
    title: 'Regulatory reporting without spreadsheet archaeology',
    description:
      'Built pipelines for Bacen, AML, and country-specific transaction reporting so compliance workflows could rely on reproducible code and trusted data.',
    impact: 'Brazil, Mexico, and Colombia reporting flows',
    icon: 'ph:files-bold',
  },
  {
    title: 'Developer tooling for a large SQL codebase',
    description:
      'Created a VS Code extension for DLT SQL with go-to-definition, autocomplete, rename/refactor, and diagnostics across a 1,500+ SQL model codebase.',
    impact: 'Better IDE support for a large SQL-heavy workflow',
    icon: 'ph:code-bold',
  },
  {
    title: 'Webhook ingestion built for reliability',
    description:
      'Implemented AWS-powered event ingestion flows with API Gateway, Lambda, and S3 to process onboarding data asynchronously and reliably.',
    impact: 'Faster integrations and cleaner event processing',
    icon: 'ph:rocket-launch-bold',
  },
]

export const skillGroups = [
  {
    title: 'Languages',
    icon: 'ph:code-bold',
    items: [
      technologies.Scala,
      technologies.Python,
      technologies.SQL,
      technologies.TypeScript,
      technologies.CSharp,
      technologies.Node_js,
    ],
  },
  {
    title: 'Data and Platform',
    icon: 'ph:database-bold',
    items: [
      technologies.Spark,
      technologies.Databricks,
      technologies.Airflow,
      technologies.AWS,
      technologies.Lakehouse,
      technologies.ETL,
      technologies.BatchAndStreamPipelines,
    ],
  },
  {
    title: 'Backend and Delivery',
    icon: 'ph:plugs-connected-bold',
    items: [
      technologies.APIIntegrations,
      technologies.WebhookIngestion,
      technologies.Lambda,
      technologies.S3,
      technologies.Terraform,
      technologies.Observability,
      technologies.IaC,
    ],
  },
  {
    title: 'Governance and Reporting',
    icon: 'ph:shield-check-bold',
    items: [
      technologies.PIIMasking,
      technologies.UnityCatalogABAC,
      technologies.RegulatoryReporting,
      technologies.AMLPipelines,
      technologies.DataQuality,
    ],
  },
]

export const projects = [
  {
    title: 'Gestao Atlas',
    period: 'Jun 2020 - Jan 2022',
    description:
      'A Node.js and Express strategic planning system where employees receive, complete, and review tasks, with individual PDF reports for teams and contributors.',
  },
]

export const education = {
  degree: 'Bachelor of Science in Computer Science',
  school: 'University of Sao Paulo',
  period: 'Aug 2017 - Dec 2022',
}

export const certifications = [
  'Certificate of Special Studies in Data Science (450h) - University of Sao Paulo',
  'VI Advanced School in Big Data Analysis - University of Sao Paulo',
  'Data Engineering using Databricks on AWS and Azure - Udemy',
]
