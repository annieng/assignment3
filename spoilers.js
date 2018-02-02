const request = require('request')
const cheerio = require('cheerio')
const express = require('express')

// variables needed
let movieName = String(process.argv[2])
let numberOfSeconds = Number(process.argv[3])
let url = `https://www.google.ca/search?q=${movieName}+film`

//~~FUNCTIONS~~//

// function to get movie name and number of seconds before displaying spoiler from command line // then display google search results
function getMovieToSpoil() {
  for (i = 2; i < process.argv.length; i++) {
    console.log('***spoiler warning*** about to spoil ' + movieName + ' in ' + numberOfSeconds + ' seconds.')
    return movieName, numberOfSeconds
  }
}

// function to load google search results while user waits
request(url, function (error, response, data) {
  if (!error) {
    var $ = cheerio.load(data)

    $('.r').each(function (i, element) {
      console.log($(element).text())
    })
  } else {
    console.log("We’ve encountered an error: " + error);
  }
  readyToSpoil()
})

function readyToSpoil() {
  setTimeout(function () {
    request(`https://api.themoviedb.org/3/search/movie?api_key=1c367fe0bfe88e0a3c164e5d53c35804&query=${movieName}`, function (err, response, body) {
      let obj = JSON.parse(body)
      let spoiler = obj.results[0].overview
      console.log(spoiler)
    })
  }, numberOfSeconds * 1000)
}
// start program //

getMovieToSpoil()




