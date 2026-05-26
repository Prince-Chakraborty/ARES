from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "ARES"
    DEBUG: bool = True

    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama-3.3-70b-versatile"

    REDIS_URL: str = "redis://localhost:6379"
    DATABASE_URL: str = "postgresql://localhost/ares"

    SECRET_KEY: str = "ares-secret-key-change-in-production"

    MAX_AGENT_RETRIES: int = 3
    AGENT_TIMEOUT: int = 60

    class Config:
        env_file = ".env"

settings = Settings()
