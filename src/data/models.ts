// Language-neutral facts about each open model, taken from the official model pages.
// Translated text (what it is best for, where it runs) lives in the i18n files, keyed by id.
// One model per company, the latest multimodal one first, then the largest.
// Only models with a standard, readable open licence (Apache 2.0, MIT, OpenMDW) are listed.
export type ModelId =
  | "deepseek-v4-pro"
  | "glm-5-2"
  | "gpt-oss-120b"
  | "mistral-small-4"
  | "nemotron-3-ultra"
  | "step-3-5-flash"
  | "hy3"
  | "internvl3-5-241b"
  | "cogito-671b"
  | "sarvam-105b"
  | "longcat-2-5"
  | "k-exaone-2-0"
  | "motif-3"
  | "minimax-m1"
  | "allam-7b"
  | "karnak-40b"
  | "nanbeige-4-3-33b"
  | "k2-think-v2"
  | "mimo-v2-6-9b"
  | "eurollm-9b"
  | "kanana-1-5-8b"
  | "ernie-4-5-vl-424b"
  | "yehia-7b"
  | "ax-k2"
  | "jamba2-mini"
  | "laguna-xs-2"
  | "gworld-32b"
  | "elyza-thinking-33b"
  | "kat-dev-32b"
  | "rnj-1-5-8b"
  | "bielik-one-4b"
  | "cat-paws-8b"
  | "noro-olmo-13b"
  | "afm-4-5b"
  | "nuextract3"
  | "sa2va-4b"
  | "f2llm-v2-14b"
  | "pplx-embed-v2"
  | "inf-retriever-1-5b"
  | "hikari-medium"
  | "moonshine-tiny"
  | "all-minilm-l6"
  | "jais-2-70b"
  | "fanar-2-27b"
  | "qwen3-8-27b"
  | "gemma-4-31b"
  | "granite-4-h-small"
  | "apertus-v1-5-70b"
  | "kimi-linear-48b"
  | "muse-glimmer-30b"
  | "minicpm-v-4-7"
  | "alice-ai-80b"
  | "cohere-transcribe-arabic"
  | "chatterbox"
  | "phi-4-multimodal"
  | "smollm3-3b"
  | "apriel-1-6-15b"
  | "mellum-2-1"
  | "zaya1-vl-8b"
  | "gigachat-3-1-10b"
  | "baguettotron"
  | "bge-m3"
  | "mxbai-rerank-large-v2"
  | "nomic-embed-v2"
  | "arctic-embed-l-v2"
  | "olmocr-2-7b"
  | "lighton-ocr-2";

export type ModelFacts = {
  id: ModelId;
  name: string;
  short: string;
  maker: string;
  logo: string;
  ring: 0 | 1 | 2 | 3;
  size?: string;
  active?: string;
  license: string;
  context?: string;
};

// Layers from the centre out: 0 flagship (100B+), 1 Arabic, 2 mid-size and speech (20B to 100B),
// 3 small (under 20B) plus search and document models.
export const models: ModelFacts[] = [
  { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro", short: "DeepSeek V4 Pro", maker: "DeepSeek", logo: "deepseek", ring: 0, size: "1.6T", active: "49B", license: "MIT", context: "1M" },
  { id: "glm-5-2", name: "GLM-5.2", short: "GLM 5.2", maker: "Z.ai", logo: "zai", ring: 0, size: "753B", license: "MIT" },
  { id: "gpt-oss-120b", name: "gpt-oss-120b", short: "gpt-oss 120b", maker: "OpenAI", logo: "openai", ring: 0, size: "117B", active: "5.1B", license: "Apache 2.0" },
  { id: "mistral-small-4", name: "Mistral Small 4", short: "Mistral Small 4", maker: "Mistral AI", logo: "mistral", ring: 0, size: "119B", active: "6.5B", license: "Apache 2.0", context: "256K" },
  { id: "nemotron-3-ultra", name: "Nemotron 3 Ultra", short: "Nemotron 3 Ultra", maker: "NVIDIA", logo: "nvidia", ring: 0, size: "550B", active: "55B", license: "OpenMDW 1.1" },
  { id: "step-3-5-flash", name: "Step-3.5-Flash", short: "Step 3.5 Flash", maker: "StepFun", logo: "stepfun", ring: 0, size: "196B", active: "11B", license: "Apache 2.0" },
  { id: "hy3", name: "Hy3", short: "Hy3", maker: "Tencent", logo: "tencent", ring: 0, size: "295B", active: "21B", license: "Apache 2.0" },
  { id: "internvl3-5-241b", name: "InternVL3.5-241B-A28B", short: "InternVL 3.5", maker: "Shanghai AI Lab", logo: "internvl", ring: 0, size: "241B", active: "28B", license: "Apache 2.0" },
  { id: "cogito-671b", name: "Cogito v2.1 671B", short: "Cogito 671B", maker: "Deep Cogito", logo: "deepcogito", ring: 0, size: "671B", license: "MIT" },
  { id: "sarvam-105b", name: "Sarvam 105B", short: "Sarvam 105B", maker: "Sarvam AI", logo: "sarvam", ring: 0, size: "105B", license: "Apache 2.0" },
  { id: "longcat-2-5", name: "LongCat-2.5", short: "LongCat 2.5", maker: "Meituan", logo: "longcat", ring: 0, size: "1.78T", license: "MIT" },
  { id: "k-exaone-2-0", name: "K-EXAONE 2.0", short: "K-EXAONE 2.0", maker: "LG AI Research", logo: "exaone", ring: 0, size: "750B", active: "37B", license: "Apache 2.0" },
  { id: "motif-3", name: "Motif-3", short: "Motif 3", maker: "Motif Technologies", logo: "motif", ring: 0, size: "315B", license: "MIT" },
  { id: "minimax-m1", name: "MiniMax-M1", short: "MiniMax M1", maker: "MiniMax", logo: "minimax", ring: 0, size: "456B", active: "46B", license: "Apache 2.0", context: "1M" },
  { id: "allam-7b", name: "ALLaM 7B", short: "ALLaM 7B", maker: "Humain", logo: "humain", ring: 1, size: "7B", license: "Apache 2.0" },
  { id: "karnak-40b", name: "Karnak 40B", short: "Karnak 40B", maker: "Applied Innovation Center", logo: "aic", ring: 1, size: "40B", license: "Apache 2.0" },
  { id: "nanbeige-4-3-33b", name: "Nanbeige4.3-33B", short: "Nanbeige 4.3", maker: "Nanbeige", logo: "nanbeige", ring: 2, size: "33B", license: "Apache 2.0" },
  { id: "k2-think-v2", name: "K2-Think V2", short: "K2-Think V2", maker: "MBZUAI IFM", logo: "ifm", ring: 2, size: "70B", license: "Apache 2.0" },
  { id: "mimo-v2-6-9b", name: "MiMo-V2.6 9B", short: "MiMo V2.6 9B", maker: "Xiaomi", logo: "mimo", ring: 3, size: "9B", license: "MIT" },
  { id: "eurollm-9b", name: "EuroLLM-9B", short: "EuroLLM 9B", maker: "EuroLLM project", logo: "eurollm", ring: 3, size: "9B", license: "Apache 2.0" },
  { id: "kanana-1-5-8b", name: "Kanana 1.5 8B", short: "Kanana 1.5", maker: "Kakao", logo: "kakao", ring: 3, size: "8B", license: "Apache 2.0" },
  { id: "ernie-4-5-vl-424b", name: "ERNIE-4.5-VL-424B-A47B", short: "ERNIE 4.5 VL", maker: "Baidu", logo: "baidu", ring: 0, size: "424B", active: "47B", license: "Apache 2.0" },
  { id: "yehia-7b", name: "Yehia 7B", short: "Yehia 7B", maker: "Navid AI", logo: "navid", ring: 1, size: "7B", license: "Apache 2.0" },
  { id: "ax-k2", name: "A.X K2", short: "A.X K2", maker: "SK Telecom", logo: "skt", ring: 0, size: "692B", license: "Apache 2.0" },
  { id: "jamba2-mini", name: "Jamba2 Mini", short: "Jamba2 Mini", maker: "AI21 Labs", logo: "ai21", ring: 2, size: "52B", license: "Apache 2.0" },
  { id: "laguna-xs-2", name: "Laguna XS.2", short: "Laguna XS.2", maker: "poolside", logo: "poolside", ring: 2, size: "33B", license: "Apache 2.0" },
  { id: "gworld-32b", name: "gWorld 32B", short: "gWorld 32B", maker: "Trillion Labs", logo: "trillion", ring: 2, size: "32B", license: "Apache 2.0" },
  { id: "elyza-thinking-33b", name: "ELYZA-Thinking 33B", short: "ELYZA Thinking", maker: "ELYZA", logo: "elyza", ring: 2, size: "33B", license: "Apache 2.0" },
  { id: "kat-dev-32b", name: "KAT-Dev 32B", short: "KAT-Dev 32B", maker: "Kuaishou", logo: "kwaipilot", ring: 2, size: "33B", license: "Apache 2.0" },
  { id: "rnj-1-5-8b", name: "Rnj-1.5 8B", short: "Rnj 1.5 8B", maker: "Essential AI", logo: "essential", ring: 3, size: "8B", license: "Apache 2.0" },
  { id: "bielik-one-4b", name: "Bielik-One 4B", short: "Bielik One 4B", maker: "SpeakLeash", logo: "speakleash", ring: 3, size: "4.7B", license: "Apache 2.0" },
  { id: "cat-paws-8b", name: "CAT-Paws 8B", short: "CAT-Paws 8B", maker: "CyberAgent", logo: "cyberagent", ring: 3, size: "8B", license: "Apache 2.0" },
  { id: "noro-olmo-13b", name: "NorOLMo 13B", short: "NorOLMo 13B", maker: "HPLT", logo: "hplt", ring: 3, size: "13B", license: "Apache 2.0" },
  { id: "afm-4-5b", name: "AFM-4.5B", short: "AFM 4.5B", maker: "Arcee AI", logo: "arcee", ring: 3, size: "4.5B", license: "Apache 2.0" },
  { id: "nuextract3", name: "NuExtract3", short: "NuExtract 3", maker: "NuMind", logo: "numind", ring: 3, size: "4.5B", license: "Apache 2.0" },
  { id: "sa2va-4b", name: "Sa2VA 4B", short: "Sa2VA 4B", maker: "ByteDance", logo: "bytedance", ring: 3, size: "5.3B", license: "Apache 2.0" },
  { id: "f2llm-v2-14b", name: "F2LLM-v2 14B", short: "F2LLM v2", maker: "CodeFuse (Ant Group)", logo: "codefuse", ring: 3, size: "14B", license: "Apache 2.0" },
  { id: "pplx-embed-v2", name: "pplx-embed-v2 9B", short: "pplx-embed v2", maker: "Perplexity", logo: "perplexity", ring: 3, size: "9B", license: "MIT" },
  { id: "inf-retriever-1-5b", name: "inf-retriever 1.5B", short: "Inf Retriever", maker: "Infly", logo: "infly", ring: 3, size: "1.5B", license: "Apache 2.0" },
  { id: "hikari-medium", name: "Hikari Medium", short: "Hikari", maker: "SB Intuitions", logo: "sbintuitions", ring: 3, size: "0.8B", license: "MIT" },
  { id: "moonshine-tiny", name: "Moonshine Tiny", short: "Moonshine", maker: "Useful Sensors", logo: "moonshine", ring: 3, license: "MIT" },
  { id: "all-minilm-l6", name: "all-MiniLM-L6-v2", short: "MiniLM", maker: "Sentence Transformers", logo: "sbert", ring: 3, size: "22M", license: "Apache 2.0" },
  { id: "jais-2-70b", name: "Jais 2 70B", short: "Jais 2 70B", maker: "Inception · MBZUAI · Cerebras", logo: "inception", ring: 1, size: "70B", license: "Apache 2.0", context: "8,192" },
  { id: "fanar-2-27b", name: "Fanar 2 27B", short: "Fanar 2 27B", maker: "QCRI · Qatar", logo: "qcri", ring: 1, size: "27B", license: "Apache 2.0" },
  { id: "qwen3-8-27b", name: "Qwen3.8-27B", short: "Qwen3.8 27B", maker: "Alibaba Qwen", logo: "qwen", ring: 2, size: "27B", license: "Apache 2.0", context: "262K (up to 1M)" },
  { id: "gemma-4-31b", name: "Gemma 4 31B", short: "Gemma 4 31B", maker: "Google", logo: "google", ring: 2, size: "31B", license: "Apache 2.0", context: "256K" },
  { id: "granite-4-h-small", name: "Granite 4.0 H Small", short: "Granite 4.0", maker: "IBM", logo: "ibm", ring: 2, size: "32B", active: "9B", license: "Apache 2.0", context: "128K" },
  { id: "apertus-v1-5-70b", name: "Apertus v1.5 70B", short: "Apertus 70B", maker: "Swiss AI", logo: "swissai", ring: 2, size: "70B", license: "Apache 2.0" },
  { id: "kimi-linear-48b", name: "Kimi-Linear 48B", short: "Kimi Linear 48B", maker: "Moonshot AI", logo: "moonshot", ring: 2, size: "48B", active: "3B", license: "MIT" },
  { id: "muse-glimmer-30b", name: "Muse-Glimmer-30B", short: "Muse Glimmer 30B", maker: "Meta", logo: "meta", ring: 2, size: "30B", license: "Apache 2.0", context: "128K+" },
  { id: "minicpm-v-4-7", name: "MiniCPM-V 4.7 35B-A3B", short: "MiniCPM-V 4.7", maker: "OpenBMB", logo: "openbmb", ring: 2, size: "35B", active: "3B", license: "Apache 2.0" },
  { id: "alice-ai-80b", name: "Alice AI Foundation 80B", short: "Alice AI 80B", maker: "Yandex", logo: "yandex", ring: 2, size: "80B", active: "3B", license: "Apache 2.0" },
  { id: "cohere-transcribe-arabic", name: "Cohere Transcribe Arabic", short: "Transcribe Arabic", maker: "Cohere", logo: "cohere", ring: 1, size: "2B", license: "Apache 2.0" },
  { id: "chatterbox", name: "Chatterbox", short: "Chatterbox", maker: "Resemble AI", logo: "resemble", ring: 2, license: "MIT" },
  { id: "phi-4-multimodal", name: "Phi-4-multimodal", short: "Phi-4 multimodal", maker: "Microsoft", logo: "microsoft", ring: 3, size: "5.6B", license: "MIT" },
  { id: "smollm3-3b", name: "SmolLM3 3B", short: "SmolLM3", maker: "Hugging Face", logo: "huggingface", ring: 3, size: "3B", license: "Apache 2.0" },
  { id: "apriel-1-6-15b", name: "Apriel-1.6-15B-Thinker", short: "Apriel 1.6 15B", maker: "ServiceNow", logo: "servicenow", ring: 3, size: "15B", license: "MIT" },
  { id: "mellum-2-1", name: "Mellum 2.1 12B-A2.5B", short: "Mellum 2.1", maker: "JetBrains", logo: "jetbrains", ring: 3, size: "12B", active: "2.5B", license: "Apache 2.0" },
  { id: "zaya1-vl-8b", name: "ZAYA1-VL-8B", short: "ZAYA1 VL 8B", maker: "Zyphra", logo: "zyphra", ring: 3, size: "8B", license: "Apache 2.0" },
  { id: "gigachat-3-1-10b", name: "GigaChat 3.1 10B-A1.8B", short: "GigaChat 3.1", maker: "Sber AI", logo: "aisage", ring: 3, size: "10B", active: "1.8B", license: "MIT" },
  { id: "baguettotron", name: "Baguettotron", short: "Baguettotron", maker: "PleIAs", logo: "pleias", ring: 3, license: "Apache 2.0" },
  { id: "bge-m3", name: "BGE-M3", short: "BGE-M3", maker: "BAAI", logo: "baai", ring: 3, license: "MIT", context: "8,192" },
  { id: "mxbai-rerank-large-v2", name: "mxbai-rerank-large-v2", short: "Mxbai Reranker", maker: "Mixedbread", logo: "mixedbread", ring: 3, size: "1.5B", license: "Apache 2.0" },
  { id: "nomic-embed-v2", name: "Nomic Embed Text v2 MoE", short: "Nomic Embed", maker: "Nomic AI", logo: "nomic", ring: 3, license: "Apache 2.0" },
  { id: "arctic-embed-l-v2", name: "Arctic Embed L 2.0", short: "Arctic Embed", maker: "Snowflake", logo: "snowflake", ring: 3, license: "Apache 2.0" },
  { id: "olmocr-2-7b", name: "olmOCR-2-7B", short: "olmOCR 2", maker: "Allen AI", logo: "allenai", ring: 3, size: "7B", license: "Apache 2.0" },
  { id: "lighton-ocr-2", name: "LightOnOCR-2-1B", short: "LightOnOCR 2", maker: "LightOn", logo: "lightonai", ring: 3, size: "1B", license: "Apache 2.0" },
];
