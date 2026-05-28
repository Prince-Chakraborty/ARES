from core.config import settings
from core.logger import get_logger

logger = get_logger("core.llm")

def get_llm_client():
    if settings.use_azure_openai:
        from openai import AsyncAzureOpenAI
        logger.info("Using Azure OpenAI")
        return AsyncAzureOpenAI(
            api_key=settings.AZURE_OPENAI_API_KEY,
            azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
            api_version=settings.AZURE_OPENAI_API_VERSION
        ), settings.AZURE_OPENAI_DEPLOYMENT
    else:
        from groq import AsyncGroq
        logger.info("Using Groq LLaMA")
        return AsyncGroq(api_key=settings.GROQ_API_KEY), settings.GROQ_MODEL

async def chat(messages: list, temperature: float = 0.3) -> str:
    client, model = get_llm_client()
    response = await client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature
    )
    raw = response.choices[0].message.content.strip()
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    return raw.strip()
