'use strict';

/**
 * Called every time we display a new park. This displays the name, description, and URL of each park.
 * @param {string} name - name of the park
 * @param {string} description  - description of the park
 * @param {string} url - url of the park's website
 * @param {number} i - the number of park we're currently on
 * @param {string} state - state code for each individual park
 */
function populateItems(name, description, url,i,state) {
  $('#listOfParks').append(`
    <h3>#${i}: ${name} - ${state}</h3>
    <p>Description: ${description}</p>
    <p>URL: ${url}</p>
  `);
}

/**
 * Clears out the old data and calls for the new data to be inserted into the HTML. 
 * @param {object} response - NPS's JSON response to my API call
 * @param {*} state - the state we display parks from
 * @param {*} max - max number of parks to display, 10 being the default.
 */
function displayResults(response,state,max=10) {
  $('#listOfParks').empty();
  console.log(response.data);
  let totalDisplay = max>response.data.length ? response.data.length : max;
  $('#displayH2').text(`Results: showing ${totalDisplay} parks for ${state}`);
  for (let i=0; i<totalDisplay;i++) {
    let name = response.data[i].fullName;
    let description = response.data[i].description;
    let url = response.data[i].url;
    let stateCode = response.data[i].states;
    populateItems(name,description,url,i+1,stateCode);
  }
}

/**
 * Takes all of the data necessary for accessing the API and forms a string from them.
 * @param {string} stateChoice - the state to gather parks from
 * @param {number} maxResults - max number of results to display
 * @param {string} apiKey - my specific API Key
 * @param {string} url - API GET URL
 */
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