import requests


url = 'http://127.0.0.1:8000/users/'
url_token = 'http://127.0.0.1:8000/api-auth/token/'

response = requests.get(url)
print(response.status_code)
print(response.json())


data = {
    'username': 'noud',
    'password': 'noud',
}

response = requests.post(url_token, data=data)
print(response.status_code)
print(response.json())

token = response.json()['token']

headers = {
    'Authorization': f'Token {token}',
}

response = requests.get(url, headers=headers)
print(response.status_code)
print(response.json())
