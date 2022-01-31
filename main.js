// -------------page switcher---------------
var login;
var main;




/* Moralis init code */
const atributes = document.querySelector(".atributes");
const loginPage = document.querySelector(".login-page");
const mainPage = document.querySelector(".main-page");
const serverUrl = "https://4s4l0zjmvpvz.usemoralis.com:2053/server";
const appId = "h0V0uZQJzQVrh6ZLpO7DAtPUJL78mBqobKf9nZVZ";
Moralis.start({ serverUrl, appId });

/* Authentication code */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
      .then(function (user) {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
        loginPage.classList.add("hide");
        mainPage.classList.remove("hide");
        getNFTs();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
  loginPage.classList.remove("hide");
  mainPage.classList.add("hide");
}

async function getNFTs(){
    const options = {
      chain: "eth",
      address: "0xb5e6acc6cbb5d712a96fcc7a8fe25a69f10ecf4c",
    };
    const EthNFTs = await Moralis.Web3API.account.getNFTs(options);

    console.log(EthNFTs.result[10].metadata);
    atributes.innerHTML = EthNFTs.result[10].metadata;
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
// ---------x------- LOG IN ----------x--------


// -----------------