//------------- overall variables-----------
//pages
const loginPage = document.querySelector(".login-page");
const userPage = document.querySelector(".user-page");
const pages = [loginPage, userPage];
var currentPage = 1;
//-------x----- overall variables----x------

// -------------page switching---------------

function switchPage(target_page) {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    page.classList.add("hide");
  }
  target_page.classList.remove("hide");
}
function pageHandler() {
  if (!user.isCurrent()) {
    switchPage(loginPage);
  } else {
    switchPage(pages[currentPage]);
  }
}
// ------x------page switching-------x-------
// ---------x------- LOG IN ----------x--------
/* Moralis init code */
const atributes = document.querySelector(".atributes");
const serverUrl = "https://4s4l0zjmvpvz.usemoralis.com:2053/server";
const appId = "h0V0uZQJzQVrh6ZLpO7DAtPUJL78mBqobKf9nZVZ";
Moralis.start({ serverUrl, appId });
let user = Moralis.User.current();

/* Authentication code */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({
      signingMessage: "Log in using Moralis",
    })
      .then(function (user) {
        switchPage(userPage);
        const options = {
          chain: "eth",
          address: "0x1e30eeebfeab70f9f88761d98edfe708ea27e95c",
        };
        const nfts = Moralis.Web3API.account.getNFTs(options);
        console.log(nfts);
        console.log(nfts.PromiseResult);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
  console.log(user);
  switchPage(loginPage);
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
// ---------x------- LOG IN ----------x--------

// -----------------
setInterval(pageHandler, 50);

moralis