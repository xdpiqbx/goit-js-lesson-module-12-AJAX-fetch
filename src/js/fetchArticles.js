const key = "5539124be63445549212ecda735b3710"

function fetchArticles (searchQuery, page = 1){
   //let url =`https://newsapi.org/v2/everything?apiKey=${key}&q=bitcoin&language=en`

   //чтоб не светить apiKey в командной строке, можно передать его через заголовок
   let url =`https://newsapi.org/v2/everything?q=${searchQuery}&language=en&pageSize=10&page=${page}`

   const options = {
       headers:{
           'Authorization': key
       }
   }

   return fetch(url, options)
   .then(res => res.json())
   .then(data => data.articles)
   .catch(error => console.log(error))
}

export default fetchArticles;