import json

import requests


url = 'http://127.0.0.1:8000/users/'
url_login = 'http://127.0.0.1:8000/api/auth/login/'
url_logout = 'http://127.0.0.1:8000/api/auth/logout/'


# Try to login without token.
response = requests.get(url)
print(response.status_code)
print(response.json())


# Login and get token.
data = {
    'username': 'noud',
    'password': 'noud',
}

response = requests.post(url_login, data=data)
print(response.status_code)
print(response.json())


# Get information with Token.
token = response.json()['token']

headers = {
    'Authorization': f'Token {token}',
}

response = requests.get(url, headers=headers)
print(response.status_code)
print(response.json())


# Logout
response = requests.post(url_logout, headers=headers)
print(response.status_code)


# Try to get information with expired Token.
response = requests.get(url, headers=headers)
print(response.status_code)
print(response.json())


# Login again.
response = requests.post(url_login, data=data)
print(response.status_code)
print(response.json())


# Get information with Token.
token = response.json()['token']

headers = {
    'Authorization': f'Token {token}',
}

response = requests.get(url, headers=headers)
print(response.status_code)
print(response.json())
