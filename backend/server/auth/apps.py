from django.apps import AppConfig


class AuthConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "server.auth"
    label = "api_auth"
