from rest_framework import serializers
from .helpers import Google, register_social_user
from .github import Github
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed


class GoogleSignInSerializer(serializers.Serializer):
    access_token=serializers.CharField(min_length=6)


    def validate_access_token(self, access_token):
        user_data=Google.validate(access_token)
        try:
            user_data['sub']
            
        except:
            raise serializers.ValidationError("this token has expired or invalid please try again")
        
        if user_data['aud'] != settings.GOOGLE_CLIENT_ID:
                raise AuthenticationFailed('Could not verify user.')

        user_id=user_data['sub']
        email=user_data['email']
        first_name=user_data['given_name']
        last_name=user_data['family_name']
        provider='google'

        return register_social_user(provider, email, first_name, last_name)


class GithubLoginSerializer(serializers.Serializer):
    code = serializers.CharField()

    def validate_code(self, code):   
        access_token = Github.exchange_code_for_token(code)

        if access_token:
            user_data=Github.get_github_user(access_token)

            full_name=user_data['name']
            email=user_data['email']
            names=full_name.split(" ")
            firstName=names[1]
            lastName=names[0]
            provider='github'
            return register_social_user(provider, email, firstName, lastName)

        