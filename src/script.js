//ORDEM DO FICHEIRO JAVASCRIPT
// 1. Cores → Define as cores para cada categoria do data.json
// 2. Variáveis vazias → Declara o que vai guardar
// 3. Fetch → Vai buscar os dados
// 4. Função renderCards → Define como fazer os cartões
// 5. Event listeners → Coloca os botões a funcionar


const categoryStyle = {
    Work: {background: 'hsl(15, 100%, 70%)', image: '../images/icon-work.svg'},
    Play: {background: 'hsl(195, 74%, 62%)', image: '../images/icon-play.svg'},
    Study: {background: 'hsl(348, 100%, 68%)', image: '../images/icon-study.svg'},
    Exercise: {background: 'hsl(145, 58%, 55%)', image: '../images/icon-exercise.svg'},
    Social: {background: 'hsl(264, 64%, 52%)', image: '../images/icon-social.svg'},
    'Self Care': {background: 'hsl(43, 84%, 65%)', image: '../images/icon-self-care.svg'},
}

// Variável para armazenar os dados carregados
let allData = [];
//Variável para armazenar o timeframe atual(por exemplo, daily, weekly ou monthly)
let currentTimeframe = 'weekly'; // Padrão (altera ao clicar no btn)

// Função para criar os cards tendo em conta as categorias
function renderCards(timeframe) {
    currentTimeframe = timeframe; //começa com o valor padrão "weekly"
    const containerCard = document.querySelector('.container-card');
    containerCard.innerHTML = ''; // Limpar cards anteriores

    allData.forEach(item => { //forEach para cada categoria do data.json
        const style = categoryStyle[item.title] || { background: '#ccc', image: '' }; //pega na cor e na img de cada categoria 
        const hours = item.timeframes[timeframe]; //pega nas horas do timeframe selecionado

        const card = document.createElement('div'); //cria um elemento div 
        card.className = 'card'; //atribui uma class à div
        card.style.backgroundImage = `url('${style.image}')`; //atribui a img à div
        card.style.backgroundColor = style.background;//atribui o background à div

        //insere o conteúdo dentro da div
        card.innerHTML = `
            <div class="card-content">
                
                <div class="card-header">
                    <h3 class="category-name">${item.title}</h3>
                    <button class="menu-btn">⋯</button>
                </div>

                <div class="card-body">
                    <span class="current-hours">${hours.current}hrs</span>
                    <span class="previous-hours">Previous - ${hours.previous}hrs</span>
                </div>
            </div>
        `;

        //adiciona a div à div pai (container-card)
        containerCard.appendChild(card);
    });
}

// Buscar os dados do JSON
fetch('data.json')
    .then(response => response.json()) //transforma os dados em json
    .then(data => {
        allData = data;//guarda os dados na variável allData
        renderCards(currentTimeframe); //chama a função que cria as divs card com esses dados
    })
    .catch(error => console.error('Erro ao carregar dados:', error)); //caso dê erro


//Adicionar eventos aos botões de período
document.querySelectorAll('.option').forEach(btn => { //seleciona todos os btn da class "option"
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remover active de todos
        document.querySelectorAll('.option').forEach(b => b.classList.remove('active'));
        
        // Adicionar active ao botão clicado
        btn.classList.add('active');
        
        // Atualizar timeframe conforme o texto do botão
        const timeframe = btn.textContent.toLowerCase();
        //cria os novos cards
        renderCards(timeframe);
    });
});