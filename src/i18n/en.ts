// English copy. The Arabic file must have exactly the same shape.
export const en = {
  meta: {
    title: "Hima — Private AI that runs inside your walls",
    description:
      "Private Arabic and English AI for regulated companies in the Gulf. It runs on your own servers, in a private cloud, or in an in-country shared cloud, and your data stays under your control.",
  },
  nav: {
    why: "Why private",
    how: "How it works",
    get: "What you get",
    where: "Where it runs",
    pilot: "Pilot",
    faq: "Questions",
    cta: "Book a demo",
    skip: "Skip to content",
    switchLabel: "العربية",
    switchAria: "عرض الموقع بالعربية",
    menu: "Menu",
  },
  hero: {
    kicker: "Private AI for the Gulf",
    title: "Private AI that runs inside your walls.",
    lead:
      "Hima runs AI on your own server or developer machine, with full control over your data. You get the same experience as the big AI services, across more than one model, and we take care of running it.",
    primary: "Book a demo",
    secondary: "See where it can run",
    stats: [
      { value: "4", label: "ways to run it" },
      { value: "8", label: "weeks to review" },
      { value: "100", label: "real questions tested" },
      { value: "0", label: "training on your data" },
    ],
  },
  how: {
    title: "AI on your own machine, run for you",
    lead: "Three parts, one service. Select a step to see which part of the server it uses.",
    step: "Step",
    prev: "Previous step",
    next: "Next step",
    caption: "Illustrative image of the hardware. The part shown changes with each step.",
    items: [
      {
        title: "Your data stays on your machine",
        text: "Hima runs on a server in your building, a developer machine, or a private in-country cloud. Your documents, questions and answers are stored there and nowhere else.",
      },
      {
        title: "Any model, the same experience",
        text: "Staff get the chat and developers get the API they know from other AI services. Behind it you can use more than one model, and switch models without changing anything.",
      },
      {
        title: "Answers you can check",
        text: "Every answer shows the passage it came from, and every question and answer is logged with user and time. We take care of installing, updating and monitoring the system.",
      },
    ],
  },
  suite: {
    title: "Ready-made assistants for the work your teams do",
    lead: "Each one runs on your own infrastructure, on your own data. Pick one to see an example.",
    example: "Example",
    prev: "Previous",
    next: "Next",
    primary: "Book a demo",
    secondary: "See the API",
    caption: "Illustrative images. The example is shortened.",
    tabs: [
      {
        tab: "Code",
        title: "A coding assistant that keeps your code in-house",
        text: "Developers get completion, explanations and reviews inside the tools they already use, through the standard API. Your code never leaves your servers.",
        bullets: [
          "Complete and explain code",
          "Review changes before they are merged",
          "Write tests and documentation",
          "Answer questions about your own repositories",
        ],
        card: {
          you: "Write a test for the invoice parser",
          lines: ['test("parses a paid invoice", () => {', "  const invoice = parseInvoice(sample);", '  expect(invoice.status).toBe("paid");', "});"],
          mono: true,
          source: null as null | { label: string; passage: string },
          foot: "Written on your server. Your code is not sent out.",
        },
      },
      {
        tab: "Voice",
        title: "Speech in, text out, on your own server",
        text: "Turn meetings and calls into written notes, and read answers aloud, without sending audio to an outside service. We test it on your own recordings before you rely on it.",
        bullets: ["Turn recordings into text", "Summarise meetings", "Read answers aloud", "Arabic and English"],
        card: {
          you: "Voice note, 0:42",
          lines: ["Please send the signed contract to the legal team before Thursday."],
          mono: false,
          source: null as null | { label: string; passage: string },
          foot: "Turned into text on your server",
        },
      },
      {
        tab: "Documents",
        title: "Read, summarise and compare your documents",
        text: "Hand over contracts, reports and forms and get summaries, extracted fields and comparisons, in Arabic or English.",
        bullets: ["Summarise long documents", "Pull out dates, names and amounts", "Compare two versions", "Translate between Arabic and English"],
        card: {
          you: "Summarise this contract",
          lines: ["Who the parties are, and the length of the contract", "When payments are due, and how much", "How either side can end it"],
          mono: false,
          source: { label: "contract.pdf", passage: "Pages 1 to 6" } as null | { label: string; passage: string },
          foot: "A short example summary, checked against the source",
        },
      },
      {
        tab: "Knowledge",
        title: "Ask your own policies and procedures",
        text: "Staff ask a question and get an answer from your own documents, with the source passage shown. Every question is logged.",
        bullets: [
          "Every answer names the passage it came from",
          "Questions in Arabic or English",
          "Every question and answer logged",
          "Answers limited to the documents you load",
        ],
        card: {
          you: "What does our retention policy say?",
          lines: ["Records are kept for seven years after the relationship ends."],
          mono: false,
          source: { label: "Retention policy", passage: "Section 4.2" } as null | { label: string; passage: string },
          foot: "Question and answer logged",
        },
      },
      {
        tab: "Custom",
        title: "Built into your own systems",
        text: "Your developers connect your own apps to Hima through one OpenAI-compatible API, and choose the model for each task.",
        bullets: ["One standard API", "A model chosen per task", "Keys and limits for each team", "Change models without rewriting"],
        card: {
          you: "Your app sends a request",
          lines: ["Hima picks the model you set for this task", "The answer returns to your app", "The request and answer are logged"],
          mono: false,
          source: null as null | { label: string; passage: string },
          foot: "The same API for every model",
        },
      },
    ],
  },
  stages: {
    title: "Every scale, every stage",
    lead: "Start small, prove it, then roll it out. The same system runs at each step.",
    outcomeLabel: "What you see",
    hardwareTitle: "Starting hardware",
    caption: "Illustrative image of the hardware at each stage.",
    items: [
      {
        step: "Try",
        title: "One developer machine",
        text: "One developer tries a coding model on a machine you already have, with files that stay on it.",
        outcome: "You see how the models answer and write code on your own material.",
        hardware: "A developer machine or workstation",
      },
      {
        step: "Prove",
        title: "One team, one server",
        text: "The eight-week pilot: one use case on one server, with 20 to 50 of your staff working on your documents.",
        outcome: "You see results on 100 of your real questions, then decide what happens next.",
        hardware: "One GPU workstation or server",
      },
      {
        step: "Run",
        title: "Every team",
        text: "Each department gets its own key, allowed models and limits, with usage reports and a full log.",
        outcome: "One platform the whole organisation uses, on infrastructure you control.",
        hardware: "Servers in your building or an in-country data centre",
      },
    ],
    care: {
      title: "We take care of the infrastructure",
      text: "You keep the data. We run the system.",
      items: ["Installation", "Updates", "Monitoring", "Keys"],
    },
  },
  picker: {
    title: "Choose where the AI runs",
    hint: "Pick an option to see what stays inside your premises.",
    inside: "Your premises",
    outside: "Outside your premises",
    staff: "Your staff",
    docs: "Your documents",
    server: "AI server",
    dedicated: "AI server, yours alone",
    sharedServer: "AI server, shared",
    control: "Hima management: keys, updates, monitoring",
    nothing: "Nothing runs outside",
    modes: {
      onprem: {
        tab: "In your building",
        text: "The AI server sits in your own server room and works with the internet unplugged. For your most sensitive data.",
        link: "No connection to the outside",
      },
      connected: {
        tab: "In your building, managed by us",
        text: "The server and your documents stay with you. We handle keys, updates and monitoring over a management link that carries no documents.",
        link: "Management link only, no documents",
      },
      private: {
        tab: "Private cloud",
        text: "A dedicated server in an in-country data centre, used by you alone and reached only through a private tunnel.",
        link: "Private encrypted tunnel",
      },
      shared: {
        tab: "Shared cloud",
        text: "A shared in-country server with your own keys and limits. The quickest start, for work that is not sensitive.",
        link: "Encrypted internet connection",
      },
    },
  },
  why: {
    title: "Public AI tools are useful. With regulated data, they are a problem.",
    items: [
      {
        title: "Your data leaves the country.",
        text: "Most AI services process requests on servers abroad. For customer, financial or government data, that can break data residency rules.",
        source: null as null | { label: string; href: string },
      },
      {
        title: "You answer for your vendors.",
        text: "The UAE central bank's February 2026 guidance on AI makes licensed firms responsible for the AI tools and vendors they use.",
        source: {
          label: "Hadef & Partners, 2026",
          href: "https://hadefpartners.com/news-insights/insights/ai-in-banking-finance-in-the-uae-2026-legal-regulatory-considerations/",
        },
      },
      {
        title: "Switching later is hard.",
        text: "88% of UAE executives say changing their main AI vendor or model would be difficult today.",
        source: { label: "IBM Institute for Business Value, 2026", href: "https://mea.newsroom.ibm.com/IBV-IBM-Study-UAE" },
      },
    ],
    sourceLabel: "Source",
  },
  get: {
    title: "What your team gets",
    items: [
      {
        title: "Answers from your own documents",
        text: "Staff ask in Arabic or English and get answers drawn from your policies, procedures and regulations, with the source passage shown.",
      },
      {
        title: "Arabic that is tested, not assumed",
        text: "We test Arabic models from the region on your real questions before you rely on them, and show you the results.",
      },
      {
        title: "A record of every question",
        text: "Every question and answer is logged with user and time, ready for audit or a regulator's review.",
      },
      {
        title: "One connection for your own apps",
        text: "Your developers get one standard API that works with tools built for OpenAI. Models can change behind it without rewriting anything.",
      },
      {
        title: "Limits for every team",
        text: "Decide who can use which model and how much, and see usage by department.",
      },
      {
        title: "No lock-in",
        text: "Built on open models and open-source software. If you stop working with us, the system stays with you and keeps running.",
      },
    ],
  },
  api: {
    title: "One API. The OpenAI shape.",
    lead: "Your developers get one standard API that works with tools built for OpenAI. Models can change behind it without rewriting anything.",
    note: "An example request. You choose the address, the key and the model.",
    prompt: "What does our retention policy say?",
    copy: "Copy",
    copied: "Copied",
  },
  where: {
    title: "Four ways to run it. One service.",
    lead: "The same assistant and the same API in every option. Start in one and move to another later.",
    cols: ["Option", "Where the server is", "Who else uses it", "Internet connection", "Best for"],
    rows: [
      ["In your building", "Your server room", "Only you", "Not needed", "Customer records, contracts, anything regulated"],
      ["In your building, managed by us", "Your server room", "Only you", "Management link only", "Teams without in-house AI operations"],
      ["Private cloud", "In-country data centre", "Only you", "Private tunnel", "A fast start without buying hardware"],
      ["Shared cloud", "In-country data centre", "Other customers, separated by keys and limits", "Yes, encrypted", "Trials and non-sensitive work"],
    ],
  },
  pilot: {
    title: "Start with one use case in eight weeks",
    lead: "A fixed-price pilot on your own documents. Once you have seen the results, you decide what happens next.",
    steps: [
      { when: "Week 0", title: "Scope", text: "We agree one use case, the documents, and how success will be measured." },
      { when: "Week 1", title: "Install", text: "We set up the server with your IT team, in the option you chose." },
      { when: "Weeks 2–3", title: "Load and test", text: "We load your documents and test Arabic and English answers on 100 of your real questions." },
      { when: "Weeks 4–6", title: "Use", text: "20 to 50 of your staff use it. We review wrong answers with you every week." },
      { when: "Weeks 7–8", title: "Review", text: "A security review, handover documents, and a results report against the measures we agreed." },
    ],
    cta: "Plan a pilot",
  },
  compare: {
    title: "How Hima differs",
    cols: ["", "Public AI services", "Large sovereign clouds", "Hima"],
    rows: [
      ["Where your data is processed", "Usually abroad", "In-country, on their servers", "Where you choose, including your own building"],
      ["Works without internet", "No", "No", "Yes, on your own server"],
      ["Choice of models", "The vendor's own", "A catalogue on their platform", "Open models, tested on your questions"],
      ["Starting size", "A subscription per user", "Platform-scale projects", "One server and one use case"],
      ["If you decide to leave", "You lose the service", "You move off their platform", "The system stays and keeps running"],
    ],
    note: "A general comparison. Individual providers differ.",
  },
  security: {
    title: "Built for your IT and risk teams",
    items: [
      "Only one entry point is exposed. Everything else sits on a private network.",
      "A key for each team, with allowed models and usage limits.",
      "Encrypted connections in every option.",
      "A full audit log of every question and answer.",
      "A list of every software component with its version and licence.",
      "Backups that stay on your site.",
      "We never use your data to train any model.",
    ],
    modelsTitle: "Open models from the region and beyond",
    models: [
      { name: "Jais 2", from: "Inception and MBZUAI" },
      { name: "Falcon-H1 Arabic", from: "Technology Innovation Institute, Abu Dhabi" },
      { name: "gpt-oss", from: "OpenAI" },
    ],
    modelsText:
      "We run open-weight models you can inspect and keep: Jais 2 from Inception and MBZUAI, Falcon-H1 Arabic from the Technology Innovation Institute in Abu Dhabi, and gpt-oss from OpenAI. We recommend a model only after testing it on your questions.",
  },
  faq: {
    title: "Questions we hear first",
    items: [
      {
        q: "Do we need to buy hardware?",
        a: "Not to begin. A pilot can run on a private in-country server. To run it in your building, one GPU workstation is enough for one team, and we help you size it and order it from a local supplier.",
      },
      {
        q: "Does our data leave our premises?",
        a: "In the two in-your-building options, no. Documents, questions and answers stay on your server. In the two cloud options, data stays on in-country servers and is encrypted in transit.",
      },
      {
        q: "How good is the Arabic?",
        a: "It depends on the model and the task, which is why we test first. Before going live you see scores on your own questions, in Arabic and in English.",
      },
      {
        q: "What does it cost?",
        a: "The pilot has a fixed price agreed before we start. After that, a monthly subscription covers software, updates and support. Hardware is bought by you, or rented in the cloud options.",
      },
      {
        q: "Can we connect our own applications?",
        a: "Yes. The service offers a standard OpenAI-compatible API, so most existing tools and libraries work by changing only the address and the key.",
      },
      {
        q: "Who are you?",
        a: "Hima is a new company focused on one thing: private AI for regulated organisations in the Gulf. We would rather show you a working system on your documents than a slide deck.",
      },
    ],
  },
  contact: {
    title: "See it working on your documents",
    lead: "Tell us the use case you care about and we will arrange a live demo.",
    name: "Name",
    email: "Work email",
    company: "Company",
    mode: "Where would you run it?",
    unsure: "Not sure yet",
    message: "Your message (optional)",
    submit: "Send request",
    sending: "Sending…",
    success: "Request sent. We will reply within two working days.",
    error: "The request could not be sent. Try again, or write to",
    required: "Fill in your name, work email and company.",
    orEmail: "Or write to us at",
  },
  gulf: {
    title: "Designed and powered in the Gulf",
    lead: "Private AI for organisations that keep their data close to home.",
    cta: "Request a demo",
    art: "A Gulf city skyline beyond desert dunes at dusk",
  },
  footer: {
    product: "Product",
    company: "Company",
    tagline: "Private AI for regulated organisations in the Gulf.",
    privacy: "Privacy",
    rights: "All rights reserved.",
  },
  privacy: {
    title: "Privacy",
    back: "Back to home",
    paragraphs: [
      "This website collects only what you type into the demo request form: your name, work email, company, and message.",
      "We use that information to reply to your request and for nothing else. We do not sell it or share it with advertisers.",
      "The site sets no advertising or tracking cookies.",
      "To see, correct or delete what you sent us, write to the address below.",
    ],
  },
};

export type Dictionary = typeof en;
