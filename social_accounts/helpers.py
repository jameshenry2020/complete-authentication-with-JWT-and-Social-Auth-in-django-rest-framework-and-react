import requests
from google.auth.transport import requests
from google.oauth2 import id_token
from accounts.models import User
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed



class Google():
    @staticmethod
    def validate(access_token):
        try:
            id_info=id_token.verify_oauth2_token(access_token, requests.Request())
            if 'accounts.google.com' in id_info['iss']:
                return id_info
        except:
            return "the token is either invalid or has expired"



class Github():
    @staticmethod
    def exchange_code_for_token(code):
        try:
            params_payload={"client_id":settings.GITHUB_CLIENT_ID, "client_secret":settings.GITHUB_SECRET, "code":code}
            get_access_token=requests.post("https://github.com/login/oauth/access_token", params=params_payload, headers={'Accept': 'application/json'})
            payload=get_access_token.json()
            print(payload)
            token=payload.access_token
            return token
        except:
            return "code is invalid or has expired"

    @staticmethod
    def get_github_user(access_token):
        try:
            headers={'Authorization': f'Bearer {access_token}'}
            resp = requests.get('https://api.github.com/user', headers=headers)
            user_data=resp.json()
            print(user_data)
            return user_data
        except:
            raise AuthenticationFailed("invalid access_token", 401)



def register_social_user(provider, email, first_name, last_name):
    old_user=User.objects.filter(email=email)
    if old_user.exists():
        if provider == old_user[0].auth_provider:
            register_user=authenticate(email=email, password=settings.SOCIAL_AUTH_PASSWORD)

            return {
                'full_name':register_user.get_full_name,
                'email':register_user.email,
                'tokens':register_user.tokens()
            }
        else:
            raise AuthenticationFailed(
                detail=f"please continue your login with {old_user[0].auth_provider}"
            )
    else:
        new_user={
            'email':email,
            'first_name':first_name,
            'last_name':last_name,
            'password':settings.SOCIAL_AUTH_PASSWORD
        }
        user=User.objects.create_user(**new_user)
        user.auth_provider=provider
        user.is_verified=True
        user.save()
        login_user=authenticate(email=email, password=settings.SOCIAL_AUTH_PASSWORD)
        return {
            'email':login_user.email,
            'full_name':login_user.get_full_name,
            'tokens':login_user.tokens()
        }
