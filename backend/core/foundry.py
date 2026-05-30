from core.config import settings
from core.logger import get_logger

logger = get_logger("core.foundry")

class AzureFoundryClient:
    def __init__(self):
        self.workspace = settings.AZURE_FOUNDRY_WORKSPACE
        self.resource_group = settings.AZURE_FOUNDRY_RESOURCE_GROUP
        self.subscription_id = settings.AZURE_SUBSCRIPTION_ID
        self.connected = False
        self._initialize()

    def _initialize(self):
        if not settings.use_azure_foundry:
            logger.warning("Azure AI Foundry not configured")
            return
        try:
            from azure.ai.ml import MLClient
            from azure.identity import DefaultAzureCredential
            self.client = MLClient(
                credential=DefaultAzureCredential(),
                subscription_id=self.subscription_id,
                resource_group_name=self.resource_group,
                workspace_name=self.workspace
            )
            self.connected = True
            logger.info(f"Azure AI Foundry connected: {self.workspace}")
        except Exception as e:
            logger.warning(f"Azure AI Foundry connection failed: {e}")
            self.connected = False

    def get_workspace_info(self) -> dict:
        if not self.connected:
            return {
                "connected": False,
                "workspace": self.workspace,
                "resource_group": self.resource_group,
                "subscription": self.subscription_id,
                "status": "configured"
            }
        try:
            ws = self.client.workspaces.get(self.workspace)
            return {
                "connected": True,
                "workspace": ws.name,
                "location": ws.location,
                "resource_group": self.resource_group,
                "mlflow_uri": ws.mlflow_tracking_uri,
                "status": "active"
            }
        except Exception as e:
            return {
                "connected": False,
                "error": str(e),
                "status": "error"
            }

    def log_experiment(self, experiment_name: str, metrics: dict):
        if not self.connected:
            return False
        try:
            import mlflow
            mlflow.set_tracking_uri(
                f"azureml://centralindia.api.azureml.ms/mlflow/v1.0/subscriptions/"
                f"{self.subscription_id}/resourceGroups/{self.resource_group}/"
                f"providers/Microsoft.MachineLearningServices/workspaces/{self.workspace}"
            )
            mlflow.set_experiment(experiment_name)
            with mlflow.start_run():
                for key, value in metrics.items():
                    if isinstance(value, (int, float)):
                        mlflow.log_metric(key, value)
            logger.info(f"Logged experiment to Azure AI Foundry: {experiment_name}")
            return True
        except Exception as e:
            logger.warning(f"Failed to log to Foundry: {e}")
            return False

foundry_client = AzureFoundryClient()
