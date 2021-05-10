let searchPanelFlag = false;

async function fetchData() {
	const response = await fetch("http://localhost:3004/getData");
	const result = await response.json();
	const results = result.filter((element) => {
		return typeof element.images[0] === "object";
	});

	let mainPage = document.getElementById("articles");

	let mainDiv = document.createElement("div");
	mainDiv.style.display = "flex";
	mainDiv.style.marginTop = "2%";
	//mainDiv.style.flexDirection = "row";

	mainPage.appendChild(mainDiv);
	let mainArticle = document.createElement("h1");
	mainArticle.style.fontFamily = "Times New Roman, Times, serif";
	mainDiv.appendChild(mainArticle);

	mainArticle.innerText = results[0].title.title;

	let mainArticleSummary = document.createElement("p");
	mainArticleSummary.style.margin = "5% 5% 1% 1%";
	mainDiv.appendChild(mainArticleSummary);
	mainArticleSummary.innerText = results[0].summary.excerpt;

	let mainArticleImg = document.createElement("img");
	mainDiv.appendChild(mainArticleImg);
	mainArticleImg.width = "200";
	mainArticleImg.height = "200";
	mainArticleImg.style.float = "right";
	mainArticleImg.setAttribute("src", results[0].images[0].url);

	let secondDiv = document.createElement("div");
	secondDiv.setAttribute("class", "row");
	mainPage.appendChild(secondDiv);
	//col-md-2 rounded
	for (let i = 1; i < 5; i++) {
		let HorisontalDiv = document.createElement("div");
		HorisontalDiv.setAttribute("class", "col-md-2 rounded ");
		secondDiv.appendChild(HorisontalDiv);
		let hrArticle = document.createElement("h6");
		HorisontalDiv.appendChild(hrArticle);
		hrArticle.innerText = results[i].title.title;

		let hrArticleSummary = document.createElement("p");
		HorisontalDiv.appendChild(hrArticleSummary);
		mainArticleSummary.innerText = results[i].summary.excerpt;

		let hrArticleImg = document.createElement("img");
		HorisontalDiv.appendChild(hrArticleImg);
		mainArticleImg.width = "250";

		mainArticleImg.height = "200";
		mainArticleImg.style.float = "right";
		hrArticleImg.setAttribute("src", results[i].images[0].url);
	}

	for (let j = 5; j < results.length; j++) {
		let HorisontalDiv = document.createElement("div");
		HorisontalDiv.setAttribute("class", "col-md-4 rounded ");
		secondDiv.appendChild(HorisontalDiv);
		let hrArticle = document.createElement("h6");
		HorisontalDiv.appendChild(hrArticle);
		hrArticle.innerText = results[j].title.title;

		let hrArticleSummary = document.createElement("p");
		HorisontalDiv.appendChild(hrArticleSummary);
		mainArticleSummary.innerText = results[j].summary.excerpt;

		let hrArticleImg = document.createElement("img");
		HorisontalDiv.appendChild(hrArticleImg);
		console.log(typeof results[j].images[0]);

		if (typeof results[j].images[0] === undefined) {
			hrArticleImg.setAttribute(
				"src",
				"www.thermaxglobal.com/articles/chiller-for-a-packaging-manufacturer/image-not-found"
			);
		} else if (typeof results[j].images[0] !== undefined) {
			hrArticleImg.setAttribute("src", results[j].images[0].url);
		}
	}
	document
		.getElementById("closeSearchPanel")
		.addEventListener("click", function () {
			document.getElementById("searchPanel").style.display = "none";
		});
	document.getElementById("searchIcon").addEventListener("click", function () {
		if (searchPanelFlag) {
			document.getElementById("searchPanel").style.display = "none";
			searchPanelFlag = false;
		} else {
			document.getElementById("searchPanel").style.display = "flex";

			searchPanelFlag = true;
		}
	});

	document
		.getElementById("searchButton")
		.addEventListener("click", function () {
			//hide the main searchpanel
			document.getElementById("searchPanel").style.display = "none";

			searchPanelFlag = false;

			let searchedWord = document.querySelector("#searchWord").value;

			document.getElementById("articles").innerHTML = "";
			searchHeader();
			revealSearchResults(results, searchedWord);
		});
}

function searchHeader() {
	let searchArticle = document.getElementById("articles");
	searchArticle.style.display = "flex";
	searchArticle.style.flexDirection = "column";
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

function revealSearchResults(results, word) {
	let searchRes = document.getElementById("searchResultDiv");

	results.forEach((element, index) => {
		console.log(typeof element.title.title);
		console.log(typeof element.summary.excerpt);
	});
	const clearnResult = results.filter((element) => {
		return typeof element.summary.excerpt === "string";
	});
	console.log(clearnResult.length);

	const articlesFound = clearnResult.filter((element) => {
		return (
			element.summary.excerpt.toLowerCase().includes(word.toLowerCase()) ||
			element.summary.excerpt.toLowerCase().includes(word.toLowerCase())
		);
	});

	articlesFound.forEach((element, index) => {
		let singleResultDiv = document.createElement("div");
		singleResultDiv.setAttribute("id", "singleResultDiv");

		if (element.images[0] !== undefined) {
			let resultImg = document.createElement("img");
			resultImg.setAttribute("src", element.images[0].url);
			resultImg.style.float = "left";
			singleResultDiv.appendChild(resultImg);
		}

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
}

fetchData();
