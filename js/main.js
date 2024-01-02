const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const d = new Date();
let day = weekday[d.getDay()];
let reload = false;

let date = d.getDate();
let suffix = (date === 1 || date === 21 || date === 31) ? 'st' : (date === 2 || date === 22) ? 'nd' : (date === 3 || date === 23) ? 'rd' : 'th';

let month = monthNames[d.getMonth()];

let currentFavourite;
let engine = "google";

document.getElementById("week-day").innerHTML = `${day},<br>${date}${suffix} ${month}`;

function loadFavourites() {
    if (localStorage.getItem("favourites") !== null) {
        document.getElementById("favourites").innerHTML = localStorage.getItem("favourites");
    }
}

function addToFavourites(url, title) {
    let favouriteBlueprint = document.getElementById("favourite-blueprint");
    let favourite = favouriteBlueprint.cloneNode(true);
    favourite.removeAttribute("id");
    favourite.href = url;
    favourite.classList.add("favourite");
    favourite.querySelector("span").innerHTML = title;
    favourite.querySelector("img").src = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + url + "&sz=256";
    document.getElementById("favourites").appendChild(favourite);
    localStorage.setItem("favourites", document.getElementById("favourites").innerHTML);
}

function favouritePopup(el) {
    let popup = document.getElementById("delete-popup");
    popup.style.display = "flex";
    currentFavourite = el;
}

function closeDeletePopup() {
    let popup = document.getElementById("delete-popup");
    document.getElementsByClassName("delete-popup")[0].classList.add("popup-close-animation");
    setTimeout(function() {
        popup.style.display = "none";
        document.getElementsByClassName("delete-popup")[0].classList.remove("popup-close-animation");
    }, 400);
}

function deleteFavourite() {
    currentFavourite.remove();
    localStorage.setItem("favourites", document.getElementById("favourites").innerHTML);
    closeDeletePopup();
}

function createFavourite() {
    url = prompt("Enter the URL of the website");
    title = prompt("Enter the title of the website");
    addToFavourites(url, title);
}

function settingsPopup() {
    var settings = document.getElementById("settings")
    if (settings.style.display == "block") {
        settings.classList.add("settings-close-animation");
        setTimeout(function() {
            settings.style.display = "none";
            settings.classList.remove("settings-close-animation");
        }, 400);
    } else {
        settings.style.display = "block";
    }
}

function setWallpaper(src) {
    let path = src.split("/");
    path = path[path.length - 1];
    path = "wallpapers/" + path;
    localStorage.setItem("wallpaper", path);
    document.body.style.backgroundImage = "url(" + localStorage.getItem("wallpaper") + ")";
}

function changeColor(el)  {
    document.documentElement.style.setProperty('--text', el.value);
    localStorage.setItem("text-color", el.value);
}

function blendText(el) {
    if (el.checked) {
        document.documentElement.style.setProperty('--mix', "difference");
        localStorage.setItem("mix", "difference");
    } else {
        document.documentElement.style.setProperty('--mix', "normal");
        localStorage.setItem("mix", "normal");
    }
}

function search() {
    // check if the input starts with https:// or http:// or tcp:// or udp://  or localhost
    let url = document.getElementById("search-input").value;

    if (url.startsWith("https://") || url.startsWith("http://") || url.startsWith("tcp://") || url.startsWith("udp://") || url.startsWith("localhost")) {
        window.location.href = url;
    } else {
        if (engine === "google") {
            window.location.href = "https://www.google.com/search?q=" + url;
        } else if (engine === "duckduckgo") {
            window.location.href = "https://duckduckgo.com/?q=" + url;
        } else if (engine === "bing") {
            window.location.href = "https://www.bing.com/search?q=" + url;
        } else if (engine === "yahoo") {
            window.location.href = "https://search.yahoo.com/search?p=" + url;
        }
    }
    
}

function changeSearchEngine(value) {
    engine = value;
    localStorage.setItem("engine", value);
}

document.getElementById("search-input").addEventListener("keyup", function(event) {
    if (event.key === 13) {
        search();
    }
});

setTimeout(function() {
    loadFavourites();
}, 100);

// change the body's background image
if (localStorage.getItem("wallpaper") !== null) {
    document.body.style.backgroundImage = "url(" + localStorage.getItem("wallpaper") + ")";
}

// change the text color
if (localStorage.getItem("text-color") !== null) {
    document.documentElement.style.setProperty('--text', localStorage.getItem("text-color"));
    setTimeout(function() {
        document.getElementById("text-picker").value = localStorage.getItem("text-color");
    }, 100);
}

// blend text
if (localStorage.getItem("mix") !== null) {
    document.documentElement.style.setProperty('--mix', localStorage.getItem("mix"));
    setTimeout(function() {
        if (localStorage.getItem("mix") === "difference") {
            document.getElementById("blend-box").checked = true;
        } else {
            document.getElementById("blend-box").checked = false;
        }
    }, 100);
}

// change the search engine
if (localStorage.getItem("engine") !== null) {
    engine = localStorage.getItem("engine");
    setTimeout(function() {
        document.getElementById("search-engine").value = engine;
    }, 100);
}