let searchPanelFlag = false;

async function fetchData() {
	const response = await fetch("/getData");
	const result = await response.json();
	const results = result.filter((element) => {
		return typeof element.images[0] === "object";
	});

	let mainPage = document.getElementById("articles");

	let mainDiv = document.createElement("div");
	mainDiv.style.display = "flex";
	mainDiv.style.marginTop = "2%";

	let titlesDev = document.createElement("div");

	mainDiv.appendChild(titlesDev);
	titlesDev.style.display = "flex";
	titlesDev.style.flexDirection = "column";
	titlesDev.style.margin = "1% 10% 1% 1%";

	mainPage.appendChild(mainDiv);
	let mainArticle = document.createElement("h1");
	mainArticle.setAttribute("id", "mainArticle");

	mainArticle.style.fontFamily = "Times New Roman, Times, serif";
	titlesDev.appendChild(mainArticle);
	if (results[0].title.title === undefined) {
		mainArticle.innerText = "Article Summary not available!";
	} else mainArticle.innerText = results[0].title.title;
	mainArticle.style.cursor = "pointer";

	document.getElementById("mainArticle").addEventListener("click", () => {
		console.log("clicked");
	});

	let mainArticleSummary = document.createElement("p");
	mainArticleSummary.style.margin = "1% 1%";
	mainArticleSummary.style.color = "grey";
	titlesDev.appendChild(mainArticleSummary);
	mainArticleSummary.innerText = results[0].summary.excerpt;

	let mainArticleImg = document.createElement("img");
	mainDiv.appendChild(mainArticleImg);
	mainArticleImg.width = "250";
	mainArticleImg.height = "250";
	mainArticleImg.style.margin = "1% 10% 1% 1%";

	mainArticleImg.setAttribute("src", results[0].images[0].url);
	let lineBraker = document.createElement("hr");

	titlesDev.appendChild(lineBraker);
	lineBraker.style.border = "1px solid black";

	let secondDiv = document.createElement("div");
	secondDiv.setAttribute("class", "row");
	mainPage.appendChild(secondDiv);
	//col-md-2 rounded
	for (let i = 1; i < 5; i++) {
		let HorisontalDiv = document.createElement("div");
		HorisontalDiv.setAttribute("class", "col-md-2 rounded ");
		secondDiv.appendChild(HorisontalDiv);

		let hrArticleImg = document.createElement("img");
		HorisontalDiv.appendChild(hrArticleImg);
		mainArticleImg.width = "250";
		mainArticleImg.height = "200";
		mainArticleImg.style.float = "right";
		hrArticleImg.setAttribute("src", results[i].images[0].url);
		hrArticleImg.style.marginBottom = "5%";

		let hrArticle = document.createElement("h5");
		hrArticle.style.fontFamily = "Times New Roman, Times, serif";
		HorisontalDiv.appendChild(hrArticle);
		hrArticle.innerText = results[i].title.title;

		let hrArticleSummary = document.createElement("p");
		hrArticleSummary.style.fontSize = "75%";
		hrArticleSummary.style.color = "grey";

		HorisontalDiv.appendChild(hrArticleSummary);
		hrArticleSummary.innerText = results[i].summary.excerpt;
	}
	let lineBraker2 = document.createElement("hr");

	secondDiv.appendChild(lineBraker2);
	lineBraker2.style.border = "1px solid black";

	for (let j = 5; j < results.length; j++) {
		let bottomDiv = document.createElement("div");
		bottomDiv.setAttribute("class", "col-md-6 rounded ");

		let hrArticleImg = document.createElement("img");
		bottomDiv.appendChild(hrArticleImg);

		if (typeof results[j].images[0] === undefined) {
			hrArticleImg.setAttribute(
				"src",
				"www.thermaxglobal.com/articles/chiller-for-a-packaging-manufacturer/image-not-found"
			);
		} else if (typeof results[j].images[0] !== undefined) {
			hrArticleImg.setAttribute("src", results[j].images[0].url);
		}

		secondDiv.appendChild(bottomDiv);
		let hrArticle = document.createElement("h5");
		hrArticle.style.fontFamily = "Times New Roman, Times, serif";
		hrArticle.style.margin = "1% 1% 1% 30%";
		bottomDiv.appendChild(hrArticle);
		hrArticle.innerText = results[j].title.title;

		let hrArticleSummary = document.createElement("p");
		hrArticleSummary.style.fontFamily = "Times New Roman, Times, serif";
		hrArticleSummary.style.margin = "1% 1% 1% 30%";
		hrArticleSummary.style.color = "grey";
		bottomDiv.appendChild(hrArticleSummary);
		hrArticleSummary.innerHTML = "Text not available";
		let lineBrake = document.createElement("hr");
		bottomDiv.appendChild(lineBrake);

		if (results[j].summary.excerpt === undefined) {
			hrArticleSummary.innerText = "Text not available";
		} else if (results[j].summary.excerpt !== undefined) {
			hrArticleSummary.innerText = results[j].summary.excerpt;
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
			if (searchedWord === "") {
				alert("No Search word Entered! please enter a Key word");
			}
			document.getElementById("articles").innerHTML = "";
			searchHeader(results);
			revealSearchResults(results, searchedWord);
		});
}

function searchHeader(fetchedApi) {
	const results = fetchedApi;
	let searchArticle = document.getElementById("articles");
	searchArticle.style.display = "flex";
	searchArticle.style.flexDirection = "column";
	let searchHead = document.createElement("div");
	searchArticle.appendChild(searchHead);
	let searchTitle = document.createElement("h1");
	searchTitle.innerText = "Search Resultes";
	searchHead.appendChild(searchTitle);

	let newSearchDiv = document.createElement("div");
	newSearchDiv.style.display = "flex";
	//newSearchDiv.style.justifyContent = "space-between";

	searchHead.appendChild(newSearchDiv);

	liveSearch = document.createElement("INPUT");
	liveSearch.setAttribute("id", "newSearchHeadline");
	liveSearch.style.width = "70%";
	newSearchDiv.appendChild(liveSearch);
	liveSearch.placeholder = "Please Enter a Search Term";
	let newSearchIcon = document.createElement("i");
	newSearchIcon.setAttribute("class", "fa fa-search fa-2x"); //==============add eventlistner
	let newSearchValue = document.querySelector("#newSearchHeadline").value;
	newSearchIcon.addEventListener("click", () => {
		document.getElementById("searchResultDiv").innerHTML = "";
		//	searchHeader();
		revealSearchResults(results, newSearchValue);
		console.log("new search");
	});
	newSearchIcon.style.cursor = "pointer";
	newSearchIcon.style.backgroundColor = "green";
	newSearchIcon.style.margin = "1% 3% 1% 3%";

	newSearchDiv.style.margin = "1% 3% 1% 3%";

	newSearchDiv.appendChild(newSearchIcon);

	let searchResultDiv = document.createElement("div");
	searchResultDiv.setAttribute("id", "searchResultDiv");
	searchArticle.appendChild(searchResultDiv);
}

function revealSearchResults(results, word) {
	console.log("test1");
	let searchRes = document.getElementById("searchResultDiv");

	const clearnResult = results.filter((element) => {
		return typeof element.summary.excerpt === "string";
	});

	const articlesFound = clearnResult.filter((element) => {
		return (
			element.summary.excerpt.toLowerCase().includes(word.toLowerCase()) ||
			element.summary.excerpt.toLowerCase().includes(word.toLowerCase())
		);
	});

	console.log(articlesFound.length);
	articlesFound.forEach((element, index) => {
		let singleResultDiv = document.createElement("div");
		singleResultDiv.setAttribute("id", "singleResultDiv");
		singleResultDiv.style.padding = "1% 1% ";

		if (element.images[0] !== undefined) {
			let resultImg = document.createElement("img");
			resultImg.setAttribute("src", element.images[0].url);
			resultImg.style.float = "left";
			singleResultDiv.appendChild(resultImg);
		}

		let resultheader = document.createElement("h5");
		resultheader.style.fontFamily = "Times New Roman, Times, serif";
		resultheader.style.marginLeft = "20%";

		resultheader.innerText = element.title.title;
		singleResultDiv.appendChild(resultheader);

		let resultSummary = document.createElement("p");
		resultSummary.innerText = element.summary.excerpt;
		resultSummary.style.fontFamily = "Times New Roman, Times, serif";
		resultSummary.style.marginLeft = "20%";
		resultSummary.style.color = "grey";
		singleResultDiv.appendChild(resultSummary);

		let articleDate = document.createElement("h6");
		articleDate.innerText = element.lifecycle.initialPublishDateTime
			.toString()
			.slice(0, 10);
		articleDate.style.fontFamily = "Times New Roman, Times, serif";
		articleDate.style.marginLeft = "20%";
		articleDate.style.color = "grey";
		singleResultDiv.appendChild(articleDate);
		searchRes.appendChild(singleResultDiv);

		let lineBraker = document.createElement("hr");

		singleResultDiv.appendChild(lineBraker);
	});
}

fetchData();
