window.onload = function () {
    document.querySelector(".text").classList.add("spaced");
  
    const steps = document.querySelectorAll(".advice");
    var count = 0;
    setInterval(() => {
      steps[count].style.display = "block";
      steps[count].style.opacity = "1.0";
    }, 4000);
  };
  








  const title = document.querySelector(".title");
const countriesSelect = document.getElementById("countries");
const BASE_URL = "https://covid19.mathdro.id/api";
let countriesOptions = [];
let error = null;
const errorDiv = document.querySelector(".error");
let info = "";
const infoDiv = document.querySelector(".info");
const countryStatsDiv = document.querySelector(".country-stats");

countriesSelect.addEventListener("change", e => {
  const countryCode = e.target.value;
  console.log(countryCode);
  getStatistics(countryCode)
    .then(stats => {
      displayStatistics(stats);
    })
    .catch(err => {
      countryStatsDiv.innerHTML = "";
      errorDiv.innerText = err.message;
    });
});

function getCountries() {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/countries`)
      .then(data => data.json())
      .then(countries => {
        resolve(countries);
      })
      .catch(err => {
        reject(err);
        errorDiv.innerText = "Unable to retrieve country list";
      });
  });
}

getCountries().then(data => {
  let option;
  Object.entries(data.countries).forEach(country => {
    option = document.createElement("option");
    option.text = country[1].name;
    option.value = country[1].iso2;
    countriesSelect.add(option);
  });
});

getStatistics("world").then(stats => {
  displayStatistics(stats);
});

function displayStatistics(stats) {
  const lastUpdate = new Date(stats.lastUpdate);
  const niceDate = getLastDataUpdateDate(lastUpdate);
  errorDiv.innerText = "";
  const countryStats = `
        <div class="row">
            <div class="col-sm-4">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Confirmed : ${stats.confirmed.value}</h5>
                </div>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Recovered : ${stats.recovered.value}</h5>
                </div>
                </div>
            </div>
             <div class="col-sm-4">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Deaths : ${stats.deaths.value}</h5>
                </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 mt-4">Data updated on: ${niceDate}</div>
        </div>
    `;
  countryStatsDiv.innerHTML = countryStats;
}

function getLastDataUpdateDate(lastUpdate) {
  return `${makeToDigits(lastUpdate.getDate())}/${makeToDigits(
    lastUpdate.getMonth() + 1
  )}/${makeToDigits(lastUpdate.getFullYear())} ${makeToDigits(
    lastUpdate.getHours()
  )}H${makeToDigits(lastUpdate.getMinutes())}min`;
}

function makeToDigits(value) {
  return value > 9 ? value : "0" + value.toString();
}

function getStatistics(countryCode) {
  let url;
  if (countryCode === "world") {
    url = "https://covid19.mathdro.id/api";
  } else {
    url = `${BASE_URL}/countries/${countryCode}`;
  }
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(data => data.json())
      .then(stats => {
        console.log("stats", stats);
        if (stats.error) {
          throw Error(stats.error.message);
        }
        resolve(stats);
      })
      .catch(err => {
        reject(err);
        errorDiv.innerText = `Unable to retrieve statistics for ${countryCode}`;
      });
  });
}
















  


// document.addEventListener('DOMContentLoaded', function(){

// 	GLOBALdata = [];
// 	GLOBALselectCreated = false;
// 	GLOBALfirstChoice = getUrlParam();
// 	nCovValues.init();

// });

// const getUrlParam = function () {

// 	const queryString = window.location.search;
// 	const urlParams = new URLSearchParams(queryString);
// 	const urlParamExists = urlParams.get('country')

// 	if ( urlParamExists ) {
		
// 		const customCountry = urlParamExists.charAt(0).toUpperCase() + urlParamExists.slice(1).toLowerCase();
// 		return customCountry;

// 	} else {
	
// 		return "Total";
	
// 	}

// };

// const nCovValues = ( function () {

// 	const modifyCors = function () {

// 		( function () {

// 			const cors_api_host = 'cors-anywhere.herokuapp.com';
// 			const cors_api_url = 'https://' + cors_api_host + '/';
// 			const slice = [].slice;
// 			const origin = window.location.protocol + '//' + window.location.host;
// 			const open = XMLHttpRequest.prototype.open;

// 			XMLHttpRequest.prototype.open = function () {

// 				const args = slice.call(arguments);
// 				const targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);

// 				if ( targetOrigin && targetOrigin[0].toLowerCase() !== origin && targetOrigin[1] !== cors_api_host ) {

// 					args[1] = cors_api_url + args[1];

// 				}

// 				return open.apply(this, args);

// 			};

// 		}) ();

// 	};

// 	const getHtmlSource = function () {

// 		modifyCors();
		
// 		const SelectedCountry = GLOBALfirstChoice;
// 		const container = document.getElementById("contain-temp");
// 		const progressLogo = document.getElementById("contain-progress");

// 		let xhr = new XMLHttpRequest();
// 		xhr.open('GET', 'https://www.worldometers.info/coronavirus/#countries');
// 		xhr.addEventListener('readystatechange', function() {

// 			if ( xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200 ) {

// 				container.innerHTML =  xhr.responseText;
// 				GLOBALdata = document.getElementsByTagName('table')[0].innerText.replace(":","").split('\n');
// 				container.innerHTML = "";
// 				progressLogo.innerHTML = "";
// 				createSelectOptions();
// 				extractValues(GLOBALfirstChoice);

// 			}

// 		});

// 		xhr.send(null); 

// 	};

// 	const createSelectOptions = function () {

// 		let optionList = [];
// 		let countryCount = 0;

// 		for ( let i = 11; i < GLOBALdata.length; i++ ) {
		
// 			optionList.push(GLOBALdata[i].split(/\t/g)[0]);
// 			countryCount++;
			
// 		}
		
// 		// - diamond princess - Total
// 		countryCount = countryCount - 2;

// 		let selectList = document.createElement("select");
// 		let firstOption = document.createElement("option");
// 		firstOption.selected = true;
// 		firstOption.value = 'noChoice';
// 		firstOption.text = 'Select Country';
// 		selectList.class = "select";
// 		selectList.appendChild(firstOption);

// 		selectList.addEventListener('change', function(){ nCovValues.changeCountry(this.value); });

// 		document.getElementById("contain-select").appendChild(selectList);

// 		for ( let IdCountry in optionList.sort() ){

// 			let newOption = document.createElement("option");
// 			newOption.value = optionList[IdCountry];
// 			newOption.text = optionList[IdCountry];
// 			selectList.appendChild(newOption);

// 			const ThisFirstChoice = GLOBALfirstChoice.charAt(0).toUpperCase() + GLOBALfirstChoice.slice(1).toLowerCase();
			
// 			if ( optionList[IdCountry] == ThisFirstChoice ) {

// 				let ThisIndex = Number(IdCountry) + 1;
// 				selectList.selectedIndex = ThisIndex;

// 			}

// 		}

// 		document.getElementById("contain-NbCoutry").innerText = countryCount + " Countries Affected";
// 		document.getElementById("contain-title").innerText = "COVID-19 BREAKING NEWS";

// 		selectList.remove(0);
// 		if ( ! GLOBALselectCreated ) extractValues(GLOBALfirstChoice);
// 		GLOBALselectCreated = true;

// 	};

// 	const extractValues = function (SelectedCountry) {

// 		let covidValues = [];

// 		for ( let i = 0; i < GLOBALdata.length; i++ ) {

// 			if ( GLOBALdata[i].indexOf(SelectedCountry) != -1 ) var rawValues = GLOBALdata[i].split(/\t/g);

// 		}

// 		for ( let i = 0; i < 8; i++ ) covidValues[i] = rawValues[i]

// 		displayValues(covidValues);

// 	};

// 	const displayValues = function (countersValues) {

// 		const covCountry = countersValues[0];
// 		const covTotalCases = countersValues[1];
// 		const covNewCases = countersValues[2];
// 		const covTotalDeaths = countersValues[3];
// 		const covNewDeaths = countersValues[4];
// 		const covTotalRecovered = countersValues[5];
// 		const covActiveCases = countersValues[6];
// 		const covCritical = countersValues[7];

// 		const thisTable = document.getElementById('contain-table');
// 		let thisContent = '<table class="table">';
// 		thisContent += '<tr><th id="sur-th"></th><th>Total Cases</th><th>New Cases</th><th>Total Deaths</th><th>New Deaths</th><th>Active Cases</th><th>Total Recovered</th><th>Critical Cases</th></tr>';
// 		thisContent += '<tr><td id="sur-td">'+covCountry+'</td><td>'+covTotalCases+'</td><td class="yellow">'+covNewCases+'</td><td>'+covTotalDeaths+'</td><td class="red">'+covNewDeaths+'</td><td>'+covActiveCases+'</td><td>'+covTotalRecovered+'</td><td>'+covCritical+'</td></tr>';
// 		thisContent += '</table>';
// 		thisTable.innerHTML = thisContent;

// 	};

// 	return { 

// 		init : getHtmlSource,
// 		changeCountry : extractValues

// 	};

// })();

















