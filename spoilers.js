const request = require('request')
const cheerio = require('cheerio')
const express = require('express')
const readlineSync = require('readline-sync')

// start program here

let movieName = readlineSync.question('What movie do you want me to spoil for you? ');
let numberOfSeconds = readlineSync.question(`Enter the number of seconds you want before I tell you the ending to ${movieName}. `);
console.log('\n~ ~ ~ ~ SPOILER WARNING ~ ~ ~ ~ \nAbout to spoil ' + movieName + ' in ' + numberOfSeconds + ' seconds.')
let url = `https://www.google.ca/search?q=${movieName}+film`

//~~FUNCTIONS~~//
// function to load google search results while user waits
request(url, function (error, response, data) {
  if (!error) {
    console.log(`\n\nAlright, check out these google search results to amuse yourself while I find this spoiler for you.\n`)
    var $ = cheerio.load(data)
    $('.r').each(function (i, element) {
      console.log($(element).text())
    })
  } else {
    console.log("We’ve encountered an error: " + error);
  }
  readyToSpoil()
})

// function to search through movie database to find overview -> therefore the spoiler with a timeout set on returning the result
function readyToSpoil() {
  setTimeout(function () {
    request(`https://api.themoviedb.org/3/search/movie?api_key=1c367fe0bfe88e0a3c164e5d53c35804&query=${movieName}`, function (err, response, body) {
      let obj = JSON.parse(body)
      let spoiler = obj.results[0].overview
      console.log(' \n\n~ ~ ~ ~ LOOK BELOW FOR YOUR SPOILER ~ ~ ~ ~  \n\n' + spoiler)
    })
  }, numberOfSeconds * 1000)
}

