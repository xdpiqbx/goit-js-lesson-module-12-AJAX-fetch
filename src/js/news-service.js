const key = "5539124be63445549212ecda735b3710"

export default {

    searchQuery: "",
    page: 1,

    fetchArticles (){
        let url =`https://newsapi.org/v2/everything?q=${this.query}&language=en&pageSize=12&page=${this.page}`
        
        //чтоб не светить apiKey в командной строке, можно передать его через заголовок
        const options = {
            headers:{
                'Authorization': key
            }
        }
     
        return fetch(url, options)
        .then(res => res.json())
        .then(data => {
            this.incrementPage();
            return data.articles;
        })
        .catch(error => console.log(error))
     },

     get query(){
        return this.searchQuery
     },

     set query(value){
        this.searchQuery = value;
     },

     resetPage(){
         this.page = 1;
     },

     incrementPage(){
          this.page += 1;
     }

};