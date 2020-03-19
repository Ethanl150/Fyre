// var request=require("request");
// let user_id=""
// let token="Bearer"
// var genre_url="https://api.spotify.com/v1/recommendations/available-genre-seeds" 
var app = {} 
console.log("world")
// Allow user to choose genre
app.getGenres = (genre) => $.ajax({
    url: "https://api.spotify.com/v1/recommendations/available-genre-seeds",
    method: "GET",
    dataType: 'json',
    data: {
        type:"genre"

    }

})
//Go to spotify and get the genre

//display genre onto the page
app.events = function () {
    console.log("hello")
    $('.list-group-item').on('click', function (event) {
        event.preventDefault();
        console.log("click")
        console.log(this.innerText)
        //let genres
        app.getGenres(this.innerText)
    })
}
app.events()

// function getRandomTracks(num,tracks){
//     var randomResults=[];
//     for(let i = o; i<num;i++){
//         randomResults.push(tracks[Math.floor(Math.random()* tracks.length)])
//     }
//     return randomResults;
// }