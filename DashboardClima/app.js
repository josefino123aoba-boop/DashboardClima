const API_KEY = '4973019fd44883c6193ecf873b3cee58';

async function buscarClima() {
    const cidade = document.getElementById('cidade').value.trim();
    const resultadoDiv = document.getElementById('resultado');
    
    if (!cidade) {
        alert('Por favor, digite o nome de uma cidade.');
        return;
    }

    // Mostrar loading
    resultadoDiv.innerHTML = `
        <div class="col-span-full flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    `;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`);
        
        if (!response.ok) {
            throw new Error('Cidade não encontrada');
        }

        const dados = await response.json();
        exibirClima(dados);
    } catch (erro) {
        resultadoDiv.innerHTML = `
            <div class="col-span-full bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <p class="font-bold">Erro</p>
                <p>Não foi possível obter os dados da cidade. Verifique o nome e tente novamente.</p>
            </div>
        `;
    }
}

function exibirClima(dados) {
    const resultadoDiv = document.getElementById('resultado');
    const dataAtual = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    // Mapeamento de ícones do tempo
    const icones = {
        '01': '☀️', // céu limpo
        '02': '⛅', // poucas nuvens
        '03': '☁️',  // nuvens dispersas
        '04': '☁️',  // nuvens quebradas
        '09': '🌧️', // chuva forte
        '10': '🌦️', // chuva
        '11': '⛈️',  // tempestade
        '13': '❄️',  // neve
        '50': '🌫️'   // névoa
    };

    const codigoIcone = dados.weather[0].icon.substring(0, 2);
    const icone = icones[codigoIcone] || '🌡️';

    resultadoDiv.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-800">${dados.name}, ${dados.sys.country}</h2>
                <span class="text-4xl">${icone}</span>
            </div>
            <p class="text-gray-500 mb-2">${dataAtual}</p>
            <p class="text-gray-600 capitalize mb-4">${dados.weather[0].description}</p>
            
            <div class="grid grid-cols-2 gap-4 mt-6">
                <div class="bg-blue-50 p-4 rounded-lg">
                    <p class="text-sm text-gray-500">Temperatura</p>
                    <p class="text-2xl font-bold">${Math.round(dados.main.temp)}°C</p>
                    <p class="text-sm text-gray-500">Sensação: ${Math.round(dados.main.feels_like)}°C</p>
                </div>
                <div class="bg-blue-50 p-4 rounded-lg">
                    <p class="text-sm text-gray-500">Umidade</p>
                    <p class="text-2xl font-bold">${dados.main.humidity}%</p>
                </div>
                <div class="bg-blue-50 p-4 rounded-lg">
                    <p class="text-sm text-gray-500">Vento</p>
                    <p class="text-2xl font-bold">${dados.wind.speed} m/s</p>
                </div>
                <div class="bg-blue-50 p-4 rounded-lg">
                    <p class="text-sm text-gray-500">Pressão</p>
                    <p class="text-2xl font-bold">${dados.main.pressure} hPa</p>
                </div>
            </div>
        </div>
        
        <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Detalhes Adicionais</h3>
            <div class="space-y-3">
                <div class="flex justify-between">
                    <span class="text-gray-600">Mínima:</span>
                    <span class="font-medium">${Math.round(dados.main.temp_min)}°C</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Máxima:</span>
                    <span class="font-medium">${Math.round(dados.main.temp_max)}°C</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Nascer do Sol:</span>
                    <span class="font-medium">${new Date(dados.sys.sunrise * 1000).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">Pôr do Sol:</span>
                    <span class="font-medium">${new Date(dados.sys.sunset * 1000).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
            </div>
        </div>
    `;
}

// Buscar clima automaticamente ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    buscarClima();
});

// Permitir busca ao pressionar Enter
document.getElementById('cidade').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarClima();
    }
});
