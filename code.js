

const setup = _ => {
    let rootElem = document.getElementById("root");
     rootElem.innerHTML =
						rootElem.innerHTML + "hello";
    fetch("http://localhost:4100/getData").then(data => rootElem.innerHTML = data)
			// .then((data) => data.json())
			// .then((article) => console.log(article));
}
window.onload = setup;