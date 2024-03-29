from django.contrib import admin
from django.shortcuts import render
from django.urls import include, path
from drf_spectacular.views import (SpectacularAPIView, SpectacularRedocView,
                                   SpectacularSwaggerView)
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)


def index(request):
    """Welcome page"""
    return render(request, "index.html")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", index, name="index"),
    path("__debug__/", include("debug_toolbar.urls")),
    path("api/", include([
        path("schema/", SpectacularAPIView.as_view(), name="schema"),
        path("schema/swagger/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger"),
        path("schema/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),

        path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

        path("", include('djoser.urls')),

        path("", include("notes.urls")),
    ]))

]
