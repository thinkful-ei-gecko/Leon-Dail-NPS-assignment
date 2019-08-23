'use strict';

function populateItems(name, description, url) {
  $('#listOfParks').append(`
    <h3>${name}</h3>
    <p>Description: ${description}</p>
    <p>URL: ${url}</p>
  `);
}

function displayResults(response,state,max=10) {
  $('#displayH2').text(`Results: showing ${max} parks for ${state}`);
  $('#listOfParks').empty();
  console.log(response.data);
  for (let i=0; i<max;i++) {
    let name = response.data[i].fullName;
    let description = response.data[i].description;
    let url = response.data[i].url;
    populateItems(name,description,url);
  }
  
}

function parseUrl(stateChoice,maxResults,apiKey,url) {
  let fullUrl = `${url}?stateCode=${stateChoice}&limit=${maxResults}&api_key=${apiKey}`;
  return fullUrl;
}

/**
 * Called when the user submits the search form
 */
function searchForParks() {
  $('#park-search').on('submit', e=> {
    e.preventDefault();
    let stateChoice = $('#state-name-input').val();
    let maxResults = $('#results-amount-input').val();
    let apiKey = 'aiv9e5O0fVFSsMBrxoIPdrMtngcvzpNm4tg9HGLO';
    let url = 'https://developer.nps.gov/api/v1/parks';
    let fullUrl = parseUrl(stateChoice,maxResults,apiKey,url);
    console.log($('#results h2'));
    fetch(fullUrl)
      .then(response => {
        if (response.ok) { return response.json(); }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson,stateChoice,maxResults))
      .catch(err => { $('#displayH2').text(`Error: ${err}`); });
  });
}

/**
 * Handles our event listeners
 */
function listener() {
  searchForParks();
}

$(listener);