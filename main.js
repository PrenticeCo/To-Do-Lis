const newUserBtn = document.querySelector(".new-user-btn");
const newUserBox = document.querySelector(".add-user-box");
const newTaskBox = document.querySelector(".add-task-box");
const newUserSubmit = document.querySelector(".new-user-submit");
const newTaskSubmit = document.querySelector(".new-user-submit");
const userSelect = document.getElementById("userSelect");
const newTaskBtn = document.querySelector(".new-task-btn");
const currentUser = userSelect.value;

//POP UP WINDOW

const showNewUserBox = (event) => {
  event.stopPropagation();
};

const showNewUser = (event) => {
  event.stopPropagation();
  newUserBox.style.display = "block";
};

const showNewTaskBox = (event) => {
  event.stopPropagation();
};

const showNewTask = (event) => {
  event.stopPropagation();
  if (userSelect.value === "") {
    return;
  }
  newTaskBox.style.display = "block";
};

const newBoxHide = () => {
  newUserBox.style.display = "none";
  newTaskBox.style.display = "none";
};

newUserSubmit.addEventListener("click", showNewUserBox);
newUserBox.addEventListener("click", showNewUserBox);
newUserBtn.addEventListener("click", showNewUser);

newTaskSubmit.addEventListener("click", showNewTaskBox);
newTaskBox.addEventListener("click", showNewTaskBox);
newTaskBtn.addEventListener("click", showNewTask);

document.addEventListener("click", newBoxHide);

//CREATE LOCAL STORAGE

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

//USER SELECT

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);

  // Create an option element and set its value and text content
  const option = document.createElement("option");
  option.value = key;
  option.textContent = key;

  // Append the option to the select element
  userSelect.appendChild(option);
}

newTaskBtn.addEventListener("click", function () {
  if (userSelect.value === "") {
    userSelect.style.border = "2px solid red";
  }
});

userSelect.addEventListener("change", function () {
  userSelect.style.border = "";
  userSelect.blur();
});
