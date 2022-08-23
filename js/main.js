const inputUser = document.querySelector("#user-input");
const buttonGet = document.querySelector("#btn-buscar");
const imgUser = document.querySelector("#img-user");
const containerInfos = document.querySelector("#usuarios");
const textUser = document.querySelector(".username");
const textFollowers = document.querySelector(".followers");
const textFollowing = document.querySelector(".following");
const textURL = document.querySelector(".url");
const textLocation = document.querySelector(".location");
const textName = document.querySelector(".name");
const textRepos = document.querySelector(".repos");
const textType = document.querySelector(".type");
const textTwitter = document.querySelector(".Twitter");
const textEmail = document.querySelector(".email");

async function getDatafromAPI(user) {
    const API = await fetch(`https://api.github.com/users/${user}`);

    if (API.status == 200) {
        const data = await API.json();
        return data;
    }
}

async function renderInfoFromUsers(user) {
    const data = await getDatafromAPI(user);

    if (data) {
        imgUser.src = data.avatar_url;
        textUser.innerHTML = `${data.login} <hr/>`;
        textFollowers.innerHTML = `Followers: ${data.followers}`;
        textFollowing.innerHTML = `Following: ${data.following}`;

        textURL.setAttribute("href", `${data.html_url}`);
        textURL.innerHTML = "URL from User"

        containerInfos.style.display = "flex";

        textLocation.innerHTML = `Location: ${data.location}`;
        textName.innerHTML = `Name: ${data.name}`;
        textRepos.innerHTML = `Repositories: ${data.public_repos}`;
        textType.innerHTML = `Type: ${data.type}`;
        textTwitter.innerHTML = `Twitter: ${data.twitter_username}`;
        textEmail.innerHTML = `Email: ${data.email}`;
        console.log(data);
    }

    else {
        const allInfos = document.querySelectorAll(".infos-style");
        allInfos.forEach(el => el.innerHTML = "")
        imgUser.src = 'https://img.icons8.com/ios/500/user-not-found.png'
    }
}

buttonGet.addEventListener("click", (e) => {
    e.preventDefault();

    renderInfoFromUsers(inputUser.value)
    inputUser.value = ""
})