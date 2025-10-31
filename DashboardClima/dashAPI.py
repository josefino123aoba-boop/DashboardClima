import requests

API_KEY = "4973019fd44883c6193ecf873b3cee58"
cidade = "Maceió"
url = f"https://api.openweathermap.org/data/2.5/weather?q={cidade}&appid={API_KEY}&units=metric&lang=pt_br"

resposta = requests.get(url)
dados = resposta.json()

temperatura = dados ['main']['temp']
condicao = dados ['weather'][0]['description']
umidade = dados ['main']['humidity']
vento = dados ['wind']['speed']

print(f'Temperatura: {temperatura}°C')
print(f'Condição: {condicao}')
print(f'Umidade: {umidade}%')
print(f'Vento: {vento}m/s')




