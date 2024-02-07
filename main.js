const newUserBtn = document.querySelector(".new-user-btn");
const newUserBox = document.querySelector(".add-user-box");
const newUserSubmit = document.querySelector(".new-user-submit");
// const newTaskBtn = document.querySelector(".");

const showNewUserBox = (event) => {
  event.stopPropagation();
};

const showNewUser = (event) => {
  event.stopPropagation();
  newUserBox.style.display = "block";
};

const cartBagHide = () => {
  newUserBox.style.display = "none";
};

newUserSubmit.addEventListener("click", showNewUserBox);
newUserBox.addEventListener("click", showNewUserBox);
newUserBtn.addEventListener("click", showNewUser);
document.addEventListener("click", cartBagHide);

function createLocalStorage() {
  const username = document.getElementById("new-user").value;
  if (username !== "") {
    // Create a local storage entry with the username as the key
    localStorage.setItem(username, JSON.stringify({}));
    alert("Local storage created for " + username);
  } else {
    alert("Please enter a username.");
  }
}

newUserSubmit.addEventListener("click", createLocalStorage);
