from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    APP_NAME: str = "ARES"
    DEBUG: bool = True

    # Groq (free tier)
    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama-3.3-70b-versatile"

    # Azure OpenAI (production/hackathon)
    AZURE_OPENAI_API_KEY: Optional[str] = ""
    AZURE_OPENAI_ENDPOINT: Optional[str] = ""
    AZURE_OPENAI_DEPLOYMENT: Optional[str] = "gpt-4"
    AZURE_OPENAI_API_VERSION: Optional[str] = "2024-02-01"

    # Auto-select provider
    @property
    def use_azure(self) -> bool:
        return bool(self.AZURE_OPENAI_API_KEY and self.AZURE_OPENAI_ENDPOINT)

    REDIS_URL: str = "redis://localhost:6379"
    DATABASE_URL: str = "postgresql://localhost/ares"
    SECRET_KEY: str = "ares-secret-key-change-in-production"
    MAX_AGENT_RETRIES: int = 3
    AGENT_TIMEOUT: int = 60

    class Config:
        env_file = ".env"

settings = Settings()
