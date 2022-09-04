const inputUser = document.querySelector("#user-input"),
    buttonGet = document.querySelector("#btn-buscar"),
    imgUser = document.querySelector("#img-user"),
    containerInfos = document.querySelector("#usuarios"),
    textUser = document.querySelector(".username"),
    textFollowers = document.querySelector(".followers"),
    textFollowing = document.querySelector(".following"),
    textURL = document.querySelector(".url"),
    textLocation = document.querySelector(".location"),
    textName = document.querySelector(".name"),
    textRepos = document.querySelector(".repos"),
    textCompany = document.querySelector(".company"),
    textTwitter = document.querySelector(".Twitter"),
    textDate = document.querySelector(".bio");

async function getDatafromAPI(user) {

    try {
        const API = await fetch(`https://api.github.com/users/${user}`);

        if (API.status == 200) {
            const data = await API.json();
            return data;
        }
    }

    catch (error) {
        console.log(error);
    }
}

async function renderInfoFromUsers(user) {
    const data = await getDatafromAPI(user);

    console.log(data);
    if (data) {
        imgUser.src = data.avatar_url;
        textUser.innerHTML = `${data.login}`;
        textDate.innerHTML = `${data.bio}`
        textFollowers.innerHTML = `${data.followers}`;
        textFollowing.innerHTML = `${data.following}`;

        textURL.setAttribute("href", `${data.html_url}`);
        textURL.innerHTML = 'Profile URL'

        containerInfos.style.display = "flex";

        textLocation.innerHTML = `${data.location}`;
        textName.innerHTML = `${data.name}`;
        textRepos.innerHTML = `${data.public_repos}`;
        textCompany.innerHTML = `${data.company || 'Not found'}`;
        textTwitter.innerHTML = `${data.twitter_username || "Not found"}`;
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