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
export function setCurrentDate(element) {
  const today = new Date().toISOString().split("T")[0];
  element.value = today;
}

export function setInitMealDate(element) {
  const dateValue = element.value;
  document.cookie = `initial_meal_date=${encodeURIComponent(
    dateValue
  )}; path=/`;
}

export function meal_dt_ck_point(element) {
  const today = new Date().toISOString().split("T")[0];
  const cookies = document.cookie;
  const cookiesArray = cookies.split("; ");
  const targetCookie = cookiesArray.find((cookie) =>
    cookie.startsWith("initial_meal_date=")
  );

  const mealDate = targetCookie ? targetCookie.split("=")[1] : today;
  element.value = decodeURIComponent(mealDate);

  setInitMealDate(element);
}

export function getMode() {
  const cookies = document.cookie;
  const cookiesArray = cookies.split("; ");
  const modeCookie = cookiesArray.find((c) => c.startsWith("mode="));
  if (modeCookie) {
    return modeCookie.split("=")[1];
  }
  return null;
}

export function modeCheck() {
  if (getMode() === null) {
    document.cookie = "mode=light";
  } else {
    mode.src = `assets/${getMode()}.png`;
    if (getMode() === "dark") {
      document.body.style.backgroundColor = "black";
      logo.style.filter = "invert(1)";
    } else {
      document.body.style.backgroundColor = "white";
      logo.style.filter = "invert(0)";
    }
  }
}
