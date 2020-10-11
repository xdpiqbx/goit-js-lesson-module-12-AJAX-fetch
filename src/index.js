import './scss/main.scss';
import tplArticles from "./templates/articles.hbs"
import newsService from "./js/news-service.js"

const refs = {
    atrticlesContainer: document.querySelector('.js-articles'),
    searchForm: document.querySelector('.js-search-form'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]')
}

refs.searchForm.addEventListener('submit', event => {
    event.preventDefault()

    const form = event.currentTarget;
    newsService.query = form.elements.query.value

    refs.atrticlesContainer.innerHTML = ""
    form.reset();

    fetchArticles();
})

function updateArticlesMarcup(articles){
    const marcupArticles = tplArticles(articles)
    refs.atrticlesContainer.insertAdjacentHTML('beforeend', marcupArticles)
}

refs.loadMoreBtn.addEventListener('click', fetchArticles)

function fetchArticles(){
    refs.loadMoreBtn.classList.add("is-hidden")
    
    newsService.fetchArticles().then(articles => {
        refs.loadMoreBtn.classList.remove("is-hidden")
        updateArticlesMarcup(articles);
        window.scrollTo({
            top: document.documentElement.offsetHeight,
            behavior: 'smooth'
        });
    })
}

// const options = {
//     method: 'GET', // гет - по умолчанию
//     headers: { // сюда все заголовки моего запроса
//         Accept: 'application/json' // MIME type
//     }
// }

//fetch возвращает промис
// в первый then приходит Response
// в прототипе Response есть не только метод json() (text(), blob()..)
// const service = "http://hn.algolia.com/api/"
// let queryString = "v1/search?query=react&tags=story"
// fetch(service + queryString)
//     .then(response => response.json())
//     .then(console.log);

// const key = "5539124be63445549212ecda735b3710"
// //let url =`https://newsapi.org/v2/everything?apiKey=${key}&q=bitcoin&language=en`

// //чтоб не светить apiKey в командной строке, можно передать его через заголовок
// let url =`https://newsapi.org/v2/everything?q=bitcoin&language=en`

// const options = {
//     headers:{
//         'Authorization': key
//     }
// }

// fetch(url, options)
//     .then(res => res.json())
//     .then(({articles})=>{
//         const marcupArticles = tplArticles(articles)
//         refs.atrticlesContainer.insertAdjacentHTML('beforeend', marcupArticles)
//     })
//     .catch(error => console.log(error))



//https://youtu.be/joNSldnAQt4?t=784