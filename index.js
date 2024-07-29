// index.js

import { isName, checkStatus, alertMsg, createUser } from "./functions.js";

window.addEventListener("DOMContentLoaded", () => {
  const newBtn = document.querySelector(".newBtn");
  const userDetails = document.querySelector(".user-details");
  const okBtn = document.querySelector(".okBtn");
  const cancelBtn = document.querySelector(".cancelBtn");
  const userName = document.querySelector(".name");
  const number = document.querySelector(".number");
  const allUserList = document.querySelector(".allUsers");
  const mealNumber = document.querySelector(".mealNumber");
  const status = document.querySelector(".status");
  const mainBoxHeading = document.querySelector(".mainBoxHeading");
  const alert = document.querySelector(".alert");
  const alertText = document.querySelector(".alertText");
  const downloadPdf = document.getElementById("downloadPdf");
  const manage = document.querySelector(".manage");

  newBtn.addEventListener("click", () => {
    newBtn.classList.add("hidden");
    userDetails.classList.remove("hidden");
  });

  mealNumber.addEventListener("change", () => {
    alertMsg(alert, alertText, "Meal number changed.");
  });

  cancelBtn.addEventListener("click", () => {
    newBtn.classList.remove("hidden");
    userDetails.classList.add("hidden");
  });

  okBtn.addEventListener("click", () => {
    const user = { userName: userName.value, number: number.value };
    if (user.userName === "" || user.number === "") {
      alertMsg(alert, alertText, "Please fill all the fields");
      return;
    }
    if (parseInt(user.number) < 0) {
      alertMsg(alert, alertText, "Meal number cannot be negative.");
      return;
    }
    if (!isName(user.userName)) {
      alertMsg(
        alert,
        alertText,
        "Invalid name. Only alphabetic characters are allowed"
      );
      return;
    }
    createUser(user);
    showUserDetails();
    userName.value = "";
    number.value = "";
    newBtn.classList.remove("hidden");
    userDetails.classList.add("hidden");
  });

  downloadPdf.addEventListener("click", () => {
    html2pdf().from(manage).save();
  });

  window.addEventListener("keypress", (e) => {
    if (!userDetails.classList.contains("hidden")) {
      if (e.key === "Enter") {
        okBtn.click();
      }
    }
  });

  const showUserDetails = () => {
    const allUsers = [];
    allUserList.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      allUsers.push({ key: key, value: value });
    }

    allUsers.sort((a, b) => a.key.localeCompare(b.key));

    allUsers.forEach((user) => {
      const li = document.createElement("li");
      li.className = "justify-evenly flex bg-white my-2 rounded-md";
      const spanX = document.createElement("span");
      spanX.className = "flex items-center hover:text-red-500 cursor-pointer";
      spanX.textContent = "X";
      spanX.onclick = () => {
        localStorage.removeItem(user.key);
        showUserDetails();
        checkStatus(allUserList, mainBoxHeading, status, downloadPdf);
      };
      li.appendChild(spanX);
      const name = document.createElement("span");
      name.className = "name w-[60%] text-xl flex items-center";
      name.textContent = user.key;
      li.appendChild(name);
      const number = document.createElement("span");
      number.className = "justify-center flex w-[20%]";
      const inputNumber = document.createElement("input");
      inputNumber.className = "meal w-full p-2 border-2";
      inputNumber.value = user.value;
      inputNumber.type = "number";
      inputNumber.onchange = () => {
        if (inputNumber.value === "") {
          inputNumber.value = 0;
        }
        localStorage.setItem(user.key, inputNumber.value);
      };
      number.appendChild(inputNumber);
      li.appendChild(number);
      allUserList.appendChild(li);
    });
    checkStatus(allUserList, mainBoxHeading, status, downloadPdf);
  };

  showUserDetails();
  checkStatus(allUserList, mainBoxHeading, status, downloadPdf);
});
