from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    APP_NAME: str = "ARES"
    DEBUG: bool = True

    # Groq (primary AI)
    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama-3.3-70b-versatile"

    # Azure AI Language Service
    AZURE_LANGUAGE_KEY: str = ""
    AZURE_LANGUAGE_ENDPOINT: str = ""

    # Azure AI Foundry
    AZURE_FOUNDRY_WORKSPACE: str = ""
    AZURE_FOUNDRY_RESOURCE_GROUP: str = ""
    AZURE_SUBSCRIPTION_ID: str = ""

    # Azure OpenAI (production roadmap)
    AZURE_OPENAI_API_KEY: Optional[str] = ""
    AZURE_OPENAI_ENDPOINT: Optional[str] = ""
    AZURE_OPENAI_DEPLOYMENT: Optional[str] = "gpt-4"
    AZURE_OPENAI_API_VERSION: Optional[str] = "2024-02-01"

    @property
    def use_azure_openai(self) -> bool:
        return bool(self.AZURE_OPENAI_API_KEY and self.AZURE_OPENAI_ENDPOINT)

    @property
    def use_azure_language(self) -> bool:
        return bool(self.AZURE_LANGUAGE_KEY and self.AZURE_LANGUAGE_ENDPOINT)

    @property
    def use_azure_foundry(self) -> bool:
        return bool(self.AZURE_FOUNDRY_WORKSPACE and self.AZURE_SUBSCRIPTION_ID)

    REDIS_URL: str = "redis://localhost:6379"
    DATABASE_URL: str = "postgresql://localhost/ares"
    SECRET_KEY: str = "ares-secret-key-change-in-production"
    MAX_AGENT_RETRIES: int = 3
    AGENT_TIMEOUT: int = 60

    class Config:
        env_file = ".env"

settings = Settings()
