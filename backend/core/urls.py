from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (SpectacularAPIView, SpectacularRedocView,
                                   SpectacularSwaggerView)
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

urlpatterns = [
    path("admin/", admin.site.urls),
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
