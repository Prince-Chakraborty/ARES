from abc import ABC, abstractmethod
from typing import Any, Dict
from core.logger import get_logger
from core.config import settings
import time

class BaseAgent(ABC):
    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role
        self.logger = get_logger(f"agent.{name}")
        self.retry_count = 0
        self.max_retries = settings.MAX_AGENT_RETRIES
        self.status = "idle"
        self.result = None

    @abstractmethod
    async def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        pass

    async def execute(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        self.status = "running"
        self.logger.info(f"{self.name} started")
        start_time = time.time()

        for attempt in range(self.max_retries):
            try:
                self.result = await self.run(input_data)
                self.status = "completed"
                elapsed = round(time.time() - start_time, 2)
                self.logger.info(f"{self.name} completed in {elapsed}s")
                return self.result
            except Exception as e:
                self.retry_count += 1
                self.logger.warning(f"{self.name} attempt {attempt+1} failed: {e}")
                if attempt == self.max_retries - 1:
                    self.status = "failed"
                    self.logger.error(f"{self.name} failed after {self.max_retries} retries")
                    raise

    def get_state(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "role": self.role,
            "status": self.status,
            "retry_count": self.retry_count
        }
