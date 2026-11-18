// Language-neutral facts about each open model, taken from the official model pages.
// Translated text (what it is best for, where it runs) lives in the i18n files, keyed by id.
export type ModelId =
  | "deepseek-v4-pro"
  | "qwen3-235b"
  | "gpt-oss-120b"
  | "jais-2-70b"
  | "falcon-h1-arabic-34b"
  | "gpt-oss-20b"
  | "jais-2-8b"
  | "falcon-h1-arabic-7b"
  | "falcon-h1-arabic-3b"
  | "phi-4-mini"
  | "whisper-large-v3"
  | "bge-m3"
  | "deepseek-v4-flash"
  | "mistral-small-4"
  | "qwen3-8-27b"
  | "gemma-4-31b"
  | "glm-4-7-flash"
  | "granite-4-h-small"
  | "cohere-transcribe-arabic"
  | "qwen3-embedding-8b"
  | "bge-reranker-v2-m3"
  | "deepseek-ocr-2"
  | "granite-docling-258m"
  | "deepseek-r1"
  | "deepseek-v3-2"
  | "glm-5-2"
  | "glm-5-3-flash"
  | "glm-5-3"
  | "glm-4-5-air"
  | "qwen3-5-397b"
  | "qwen3-5-122b"
  | "qwen3-coder-480b"
  | "nemotron-3-ultra"
  | "step-3-5-flash"
  | "hy3"
  | "kimi-k2"
  | "kimi-k3"
  | "llama-4-maverick"
  | "silma-9b"
  | "qwen3-6-35b"
  | "gemma-4-26b"
  | "nemotron-3-nano-30b"
  | "devstral-small-2"
  | "qwen3-coder-next"
  | "qwq-32b"
  | "llama-3-3-70b"
  | "granite-speech-4-1-2b"
  | "gemma-4-12b"
  | "gemma-4-e4b"
  | "gemma-4-e2b"
  | "qwen3-5-9b"
  | "phi-4-multimodal"
  | "ministral-3-8b"
  | "ministral-3-3b"
  | "smollm3-3b"
  | "nemotron-3-nano-4b"
  | "granite-embedding-311m"
  | "mxbai-rerank-large-v2"
  | "olmocr-2-7b"
  | "qwen2-5-vl-7b"
  | "internvl3-5-8b"
  | "nemotron-parse-2"
  | "qianfan-ocr";

export type ModelFacts = {
  id: ModelId;
  name: string;
  short: string;
  maker: string;
  logo: string;
  ring: 0 | 1 | 2 | 3 | 4;
  size?: string;
  active?: string;
  license: string;
  context?: string;
};

// Layers from the centre out: 0 flagship (100B+), 1 Arabic, 2 mid-size and speech,
// 3 small, 4 everything else (search, documents and so on), shown faded.
export const models: ModelFacts[] = [
  { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro", short: "DeepSeek V4 Pro", maker: "DeepSeek", logo: "deepseek", ring: 0, size: "1.6T", active: "49B", license: "MIT", context: "1M" },
  { id: "qwen3-235b", name: "Qwen3 235B", short: "Qwen3 235B", maker: "Alibaba Qwen", logo: "qwen", ring: 0, size: "235B", active: "22B", license: "Apache 2.0", context: "32K (131K extended)" },
  { id: "gpt-oss-120b", name: "gpt-oss-120b", short: "gpt-oss 120b", maker: "OpenAI", logo: "openai", ring: 0, size: "117B", active: "5.1B", license: "Apache 2.0" },
  { id: "jais-2-70b", name: "Jais 2 70B", short: "Jais 2 70B", maker: "Inception · MBZUAI · Cerebras", logo: "inception", ring: 1, size: "70B", license: "Apache 2.0", context: "8,192" },
  { id: "falcon-h1-arabic-34b", name: "Falcon-H1 Arabic 34B", short: "Falcon 34B", maker: "TII", logo: "tii", ring: 1, size: "34B", license: "TII Falcon License", context: "256K" },
  { id: "gpt-oss-20b", name: "gpt-oss-20b", short: "gpt-oss 20b", maker: "OpenAI", logo: "openai", ring: 2, size: "21B", active: "3.6B", license: "Apache 2.0" },
  { id: "jais-2-8b", name: "Jais 2 8B", short: "Jais 2 8B", maker: "Inception · MBZUAI · Cerebras", logo: "inception", ring: 1, size: "8B", license: "Apache 2.0", context: "8,192" },
  { id: "falcon-h1-arabic-7b", name: "Falcon-H1 Arabic 7B", short: "Falcon 7B", maker: "TII", logo: "tii", ring: 1, size: "7B", license: "TII Falcon License", context: "256K" },
  { id: "falcon-h1-arabic-3b", name: "Falcon-H1 Arabic 3B", short: "Falcon 3B", maker: "TII", logo: "tii", ring: 1, size: "3B", license: "TII Falcon License", context: "128K" },
  { id: "phi-4-mini", name: "Phi-4-mini", short: "Phi-4-mini", maker: "Microsoft", logo: "microsoft", ring: 3, size: "3.8B", license: "MIT", context: "128K" },
  { id: "whisper-large-v3", name: "Whisper large-v3", short: "Whisper", maker: "OpenAI", logo: "openai", ring: 2, size: "1.55B", license: "Apache 2.0" },
  { id: "bge-m3", name: "BGE-M3", short: "BGE-M3", maker: "BAAI", logo: "baai", ring: 4, license: "MIT", context: "8,192" },
  { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash", short: "DeepSeek V4 Flash", maker: "DeepSeek", logo: "deepseek", ring: 0, size: "284B", active: "13B", license: "MIT", context: "1M" },
  { id: "mistral-small-4", name: "Mistral Small 4", short: "Mistral Small 4", maker: "Mistral AI", logo: "mistral", ring: 0, size: "119B", active: "6.5B", license: "Apache 2.0", context: "256K" },
  { id: "qwen3-8-27b", name: "Qwen3.8-27B", short: "Qwen3.8 27B", maker: "Alibaba Qwen", logo: "qwen", ring: 2, size: "27B", license: "Apache 2.0", context: "262K (up to 1M)" },
  { id: "gemma-4-31b", name: "Gemma 4 31B", short: "Gemma 4 31B", maker: "Google", logo: "google", ring: 2, size: "31B", license: "Apache 2.0", context: "256K" },
  { id: "glm-4-7-flash", name: "GLM-4.7-Flash", short: "GLM 4.7 Flash", maker: "Z.ai", logo: "zai", ring: 2, size: "30B", active: "3B", license: "MIT" },
  { id: "granite-4-h-small", name: "Granite 4.0 H Small", short: "Granite 4.0", maker: "IBM", logo: "ibm", ring: 2, size: "32B", active: "9B", license: "Apache 2.0", context: "128K" },
  { id: "cohere-transcribe-arabic", name: "Cohere Transcribe Arabic", short: "Transcribe Arabic", maker: "Cohere", logo: "cohere", ring: 2, size: "2B", license: "Apache 2.0" },
  { id: "qwen3-embedding-8b", name: "Qwen3-Embedding 8B", short: "Qwen3 Embedding", maker: "Alibaba Qwen", logo: "qwen", ring: 4, size: "8B", license: "Apache 2.0", context: "32K" },
  { id: "bge-reranker-v2-m3", name: "bge-reranker-v2-m3", short: "BGE Reranker", maker: "BAAI", logo: "baai", ring: 4, size: "0.6B", license: "Apache 2.0" },
  { id: "deepseek-ocr-2", name: "DeepSeek-OCR-2", short: "DeepSeek OCR 2", maker: "DeepSeek", logo: "deepseek", ring: 4, size: "3B", license: "Apache 2.0" },
  { id: "granite-docling-258m", name: "Granite-Docling 258M", short: "Granite Docling", maker: "IBM", logo: "ibm", ring: 4, size: "258M", license: "Apache 2.0" },
  { id: "deepseek-r1", name: "DeepSeek R1", short: "DeepSeek R1", maker: "DeepSeek", logo: "deepseek", ring: 0, size: "671B", active: "37B", license: "MIT" },
  { id: "deepseek-v3-2", name: "DeepSeek V3.2", short: "DeepSeek V3.2", maker: "DeepSeek", logo: "deepseek", ring: 0, size: "671B", active: "37B", license: "MIT" },
  { id: "glm-5-2", name: "GLM-5.2", short: "GLM 5.2", maker: "Z.ai", logo: "zai", ring: 0, size: "753B", license: "MIT" },
  { id: "glm-5-3-flash", name: "GLM-5.3-Flash", short: "GLM 5.3 Flash", maker: "Z.ai", logo: "zai", ring: 0, size: "320B", active: "18B", license: "MIT" },
  { id: "glm-5-3", name: "GLM-5.3", short: "GLM 5.3", maker: "Z.ai", logo: "zai", ring: 0, size: "753B", license: "GLM-5.3 License" },
  { id: "glm-4-5-air", name: "GLM-4.5-Air", short: "GLM 4.5 Air", maker: "Z.ai", logo: "zai", ring: 0, size: "106B", active: "12B", license: "MIT" },
  { id: "qwen3-5-397b", name: "Qwen3.5-397B-A17B", short: "Qwen3.5 397B", maker: "Alibaba Qwen", logo: "qwen", ring: 0, size: "397B", active: "17B", license: "Apache 2.0" },
  { id: "qwen3-5-122b", name: "Qwen3.5-122B-A10B", short: "Qwen3.5 122B", maker: "Alibaba Qwen", logo: "qwen", ring: 0, size: "122B", active: "10B", license: "Apache 2.0" },
  { id: "qwen3-coder-480b", name: "Qwen3-Coder-480B-A35B", short: "Qwen3 Coder 480B", maker: "Alibaba Qwen", logo: "qwen", ring: 0, size: "480B", active: "35B", license: "Apache 2.0" },
  { id: "nemotron-3-ultra", name: "Nemotron 3 Ultra", short: "Nemotron 3 Ultra", maker: "NVIDIA", logo: "nvidia", ring: 0, size: "550B", active: "55B", license: "OpenMDW 1.1" },
  { id: "step-3-5-flash", name: "Step-3.5-Flash", short: "Step 3.5 Flash", maker: "StepFun", logo: "stepfun", ring: 0, size: "196B", active: "11B", license: "Apache 2.0" },
  { id: "hy3", name: "Hy3", short: "Hy3", maker: "Tencent", logo: "tencent", ring: 0, size: "295B", active: "21B", license: "Apache 2.0" },
  { id: "kimi-k2", name: "Kimi K2", short: "Kimi K2", maker: "Moonshot AI", logo: "moonshot", ring: 0, size: "1T", active: "32B", license: "Modified MIT" },
  { id: "kimi-k3", name: "Kimi K3", short: "Kimi K3", maker: "Moonshot AI", logo: "moonshot", ring: 0, size: "2.8T", active: "104B", license: "Kimi K3 License" },
  { id: "llama-4-maverick", name: "Llama 4 Maverick", short: "Llama 4 Maverick", maker: "Meta", logo: "meta", ring: 0, size: "400B", active: "17B", license: "Llama 4 Community License" },
  { id: "silma-9b", name: "SILMA 9B", short: "SILMA 9B", maker: "SILMA AI", logo: "silma", ring: 1, size: "9B", license: "Gemma Terms of Use" },
  { id: "qwen3-6-35b", name: "Qwen3.6-35B-A3B", short: "Qwen3.6 35B", maker: "Alibaba Qwen", logo: "qwen", ring: 2, size: "35B", active: "3B", license: "Apache 2.0" },
  { id: "gemma-4-26b", name: "Gemma 4 26B-A4B", short: "Gemma 4 26B", maker: "Google", logo: "google", ring: 2, size: "26B", active: "3.8B", license: "Apache 2.0" },
  { id: "nemotron-3-nano-30b", name: "Nemotron 3 Nano 30B", short: "Nemotron 3 Nano", maker: "NVIDIA", logo: "nvidia", ring: 2, size: "30B", active: "3.5B", license: "NVIDIA Open Model License" },
  { id: "devstral-small-2", name: "Devstral Small 2", short: "Devstral Small 2", maker: "Mistral AI", logo: "mistral", ring: 2, size: "24B", license: "Apache 2.0" },
  { id: "qwen3-coder-next", name: "Qwen3-Coder-Next", short: "Qwen3 Coder Next", maker: "Alibaba Qwen", logo: "qwen", ring: 2, size: "80B", active: "3B", license: "Apache 2.0" },
  { id: "qwq-32b", name: "QwQ-32B", short: "QwQ 32B", maker: "Alibaba Qwen", logo: "qwen", ring: 2, size: "32B", license: "Apache 2.0" },
  { id: "llama-3-3-70b", name: "Llama 3.3 70B", short: "Llama 3.3 70B", maker: "Meta", logo: "meta", ring: 2, size: "70B", license: "Llama 3.3 Community License" },
  { id: "granite-speech-4-1-2b", name: "Granite Speech 4.1 2B", short: "Granite Speech", maker: "IBM", logo: "ibm", ring: 2, size: "2B", license: "Apache 2.0" },
  { id: "gemma-4-12b", name: "Gemma 4 12B", short: "Gemma 4 12B", maker: "Google", logo: "google", ring: 3, size: "12B", license: "Apache 2.0" },
  { id: "gemma-4-e4b", name: "Gemma 4 E4B", short: "Gemma 4 E4B", maker: "Google", logo: "google", ring: 3, size: "4.5B effective", license: "Apache 2.0" },
  { id: "gemma-4-e2b", name: "Gemma 4 E2B", short: "Gemma 4 E2B", maker: "Google", logo: "google", ring: 3, size: "2.3B effective", license: "Apache 2.0" },
  { id: "qwen3-5-9b", name: "Qwen3.5-9B", short: "Qwen3.5 9B", maker: "Alibaba Qwen", logo: "qwen", ring: 3, size: "9B", license: "Apache 2.0" },
  { id: "phi-4-multimodal", name: "Phi-4-multimodal", short: "Phi-4 multimodal", maker: "Microsoft", logo: "microsoft", ring: 3, size: "5.6B", license: "MIT" },
  { id: "ministral-3-8b", name: "Ministral 3 8B", short: "Ministral 3 8B", maker: "Mistral AI", logo: "mistral", ring: 3, size: "8B", license: "Apache 2.0" },
  { id: "ministral-3-3b", name: "Ministral 3 3B", short: "Ministral 3 3B", maker: "Mistral AI", logo: "mistral", ring: 3, size: "3B", license: "Apache 2.0" },
  { id: "smollm3-3b", name: "SmolLM3 3B", short: "SmolLM3", maker: "Hugging Face", logo: "huggingface", ring: 3, size: "3B", license: "Apache 2.0" },
  { id: "nemotron-3-nano-4b", name: "Nemotron 3 Nano 4B", short: "Nemotron Nano 4B", maker: "NVIDIA", logo: "nvidia", ring: 3, size: "4B", license: "NVIDIA Open Model License" },
  { id: "granite-embedding-311m", name: "Granite Embedding 311M", short: "Granite Embedding", maker: "IBM", logo: "ibm", ring: 4, size: "0.3B", license: "Apache 2.0" },
  { id: "mxbai-rerank-large-v2", name: "mxbai-rerank-large-v2", short: "Mxbai Reranker", maker: "Mixedbread", logo: "mixedbread", ring: 4, size: "1.5B", license: "Apache 2.0" },
  { id: "olmocr-2-7b", name: "olmOCR-2-7B", short: "olmOCR 2", maker: "Allen AI", logo: "allenai", ring: 4, size: "7B", license: "Apache 2.0" },
  { id: "qwen2-5-vl-7b", name: "Qwen2.5-VL-7B", short: "Qwen2.5 VL 7B", maker: "Alibaba Qwen", logo: "qwen", ring: 4, size: "7B", license: "Apache 2.0" },
  { id: "internvl3-5-8b", name: "InternVL3.5-8B", short: "InternVL 3.5", maker: "Shanghai AI Lab", logo: "internvl", ring: 4, size: "8B", license: "Apache 2.0" },
  { id: "nemotron-parse-2", name: "Nemotron-Parse 2.0", short: "Nemotron Parse", maker: "NVIDIA", logo: "nvidia", ring: 4, size: "0.9B", license: "OpenMDW 1.1" },
  { id: "qianfan-ocr", name: "Qianfan-OCR", short: "Qianfan OCR", maker: "Baidu", logo: "baidu", ring: 4, size: "4.7B", license: "Apache 2.0" },
];
