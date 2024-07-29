// functions.js

export function isName(userName) {
  const regex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
  return regex.test(userName);
}

export function checkStatus(allUserList, mainBoxHeading, status, downloadPdf) {
  if (allUserList.textContent === "") {
    mainBoxHeading.classList.add("hidden");
    status.classList.remove("hidden");
    status.classList.add("flex");
    downloadPdf.classList.add("hidden");
  } else {
    mainBoxHeading.classList.remove("hidden");
    status.classList.add("hidden");
    status.classList.remove("flex");
    downloadPdf.classList.remove("hidden");
  }
}

export function alertMsg(alert, alertText, msg) {
  alert.classList.remove("hidden");
  alertText.textContent = msg;
  setTimeout(() => {
    alert.classList.add("hidden");
  }, 3000);
}

export function createUser(user) {
  const { userName, number } = user;
  if (localStorage.getItem(userName)) {
    alertMsg("User already exists");
    return;
  }
  localStorage.setItem(userName, number);
}
