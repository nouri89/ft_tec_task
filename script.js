let searchPanelFlag = false;
let searchArticle = document.getElementById("articles");
searchArticle.style.display = "flex";
searchArticle.style.flexDirection = "column";

async function fetchData() {
	const response = await fetch("http://localhost:3004/getData");
	const results = await response.json();
	console.log(results);

	results.forEach((element, index) => {
		//	console.log(element.title.title);
		//	console.log(element.summary.excerpt);
	});

	//revealSearchResults(results);

	document.getElementById("searchIcon").addEventListener("click", function () {
		if (searchPanelFlag) {
			document.getElementById("searchPanel").style.display = "none";
			searchPanelFlag = false;
		} else {
			document.getElementById("searchPanel").style.display = "flex";
			searchPanelFlag = true;
		}

		//console.log(document.querySelector("#searchHeadline").value);
	});
	//	let searchedWord = document.querySelector("#searchWord").value;
	document
		.getElementById("searchButton")
		.addEventListener("click", function () {
			//hide the main searchpanel
			document.getElementById("searchPanel").style.display = "none";
			searchPanelFlag = false;

			let searchedWord = document.querySelector("#searchWord").value;
			//console.log(searchedWord);
			//document.getElementById("articles").innerHTML = `<h1>Search Results</h1>`;
			document.getElementById("articles").innerHTML = "";
			searchHeader();
			revealSearchResults(results, searchedWord);
		});
}

//let HeadlinesPage = document.createElement("div");

function searchHeader() {
	let searchHead = document.createElement("div");
	searchArticle.appendChild(searchHead);
	let searchTitle = document.createElement("h1");
	searchTitle.innerText = "Search Resultes";
	searchHead.appendChild(searchTitle);

	let newSearchDiv = document.createElement("div");
	searchHead.appendChild(newSearchDiv);

	liveSearch = document.createElement("INPUT");
	liveSearch.setAttribute("id", "newSearchHeadline");
	newSearchDiv.appendChild(liveSearch);
	liveSearch.placeholder = "Please Enter a Search Term";
	let newSearchIcon = document.createElement("i");
	newSearchIcon.setAttribute("class", "fa fa-search");
	newSearchIcon.style.backgroundColor = "green";
	newSearchIcon.style.color = "white";
	newSearchDiv.appendChild(newSearchIcon);

	let progressDiv = document.createElement("div");
	searchHead.appendChild(progressDiv);
	progressDiv.style.backgroundColor = "black";
	progressDiv.style.height = "1%";

	let searchResultDiv = document.createElement("div");
	searchResultDiv.setAttribute("id", "searchResultDiv");
	searchArticle.appendChild(searchResultDiv);
}

function revealSearchResults(data, word) {
	let searchRes = document.getElementById("searchResultDiv");

	//================================
	//let singleResultDiv = document.createElement("div");

	//come back here

	//console.log(data[0].summary.excerpt);
	const articlesFound = data.filter((element) => {
		if (
			element.title.title.toLowerCase().includes(word.toLowerCase())

			////element.summary.excerpt.toLowerCase().includes(word.toLowerCase())
		)
			return true;
	});
	console.log(articlesFound.length);

	articlesFound.forEach((element, index) => {
		let singleResultDiv = document.createElement("div");
		singleResultDiv.setAttribute("id", "singleResultDiv");
		singleResultDiv.style.border = "10px solid grey";
		let resultImg = document.createElement("img");
		resultImg.setAttribute("src", element.images[0].url);
		resultImg.style.float = "left";
		singleResultDiv.appendChild(resultImg);

		let resultheader = document.createElement("h4");
		resultheader.innerText = element.title.title;
		singleResultDiv.appendChild(resultheader);

		let resultSummary = document.createElement("p");
		resultSummary.innerText = element.summary.excerpt;
		singleResultDiv.appendChild(resultSummary);

		let articleDate = document.createElement("h6");
		articleDate.innerText = element.lifecycle.initialPublishDateTime
			.toString()
			.slice(0, 10);
		singleResultDiv.appendChild(articleDate);
		searchRes.appendChild(singleResultDiv);

		let lineBraker = document.createElement("hr");

		singleResultDiv.appendChild(lineBraker);
	});
	//	searchRes.appendChild(singleResultDiv);

	//================================================
}

/*
function revealSearchResults() {

	results.forEach((element, index) => {
		if (
			element.titel.titel.toLowerCase().search(searchWord.value.toLowerCase()) >= 0 ||
			element.summary.excerpt.toLowerCase().search(searchWord.value.toLowerCase()) >= 0
		) {
			console.log("searchfound");
			//searchFoundCounter++;
			//episodeFound.push(allEpisodes[index]);
		}
	});
	if (episodeFound.length === 0) {
		currentEpisodeHeader.innerHTML = "No result found";
	}
	console.log(episodeFound.length + " all Episodes length");
	searchResult.innerHTML =
		"Displaying " +
		searchFoundCounter +
		" / " +
		totalNumberOfEpisodes +
		" episodes ";

	
}
*/

fetchData();

//console.log("test working");
//console.log(results);
/*
document
	.querySelector("#searchHeadline")
	.addEventListener("click", function () {
		console.log("working");

		//console.log(document.querySelector("#searchHeadline").value);
	});
*/

/*
document
		.getElementById("searchButton")
		.addEventListener("click", function () {
			let searchedWord = document.querySelector("#searchWord").value;
			console.log(searchedWord);
			document.getElementById(
				"articles"
			).innerHTML = `<div>Search Results</div>`;
		});
*/
