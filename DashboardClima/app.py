import streamlit as st 
import requests 

st.title('🌤️Dashboard de clima')

cidade = st.text_input('Digite o nome da cidade:', 'Maceió')
API_KEY = '4973019fd44883c6193ecf873b3cee58'

if st.button('Buscar clima: '):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={cidade}&appid={API_KEY}&units=metric&lang=pt_br"
    r = requests.get(url)
    
    if r.status_code == 200:
        dados = r.json()
        st.subheader(f"Clima em {dados['name']}")
        st.write("Condição:", dados["weather"][0]["description"])
        st.write("Temperatura:", dados["main"]["temp"], "°C")
        st.write("Umidade:", dados["main"]["humidity"], "%")
        st.write("Vento:", dados["wind"]["speed"], "m/s")
    else:
        st.error('Cidade não encontrada.')
        
        
