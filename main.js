const newUserScribble = document.querySelector(".new-user-outline");
const newUserBox = document.querySelector(".add-user-box");
const newTaskBox = document.querySelector(".add-task-box");
const newUserSubmit = document.querySelector(".new-user-submit");
const newTaskSubmit = document.querySelector(".new-task-submit");
const newTask = document.getElementById("new-task");
const userSelect = document.getElementById("userSelect");
const newTaskScribble = document.querySelector(".new-task-outline");
const crosses = document.querySelectorAll(".cross");
const tasks = document.querySelector(".tasks");
const bulletPoint = document.querySelector(".bullet-point");
const newTaskBtn = document.querySelector(".new-task-btn");
const newUserBtn = document.querySelector(".new-user-btn");
const selectArrow = document.querySelector(".select-arrow");
const userSelectDiv = document.querySelector(".user-select");

//BUTTONS ANIMATION
userSelectDiv.addEventListener("mouseenter", function () {
  userSelect.style.fontWeight = "bold";
});

userSelectDiv.addEventListener("mouseleave", function () {
  userSelect.style.fontWeight = "normal";
});

newTaskScribble.addEventListener("mouseenter", function () {
  newTaskBtn.style.fontWeight = "bold";
  newTaskBtn.style.transform = "rotate(0deg)";
});

newTaskScribble.addEventListener("mouseleave", function () {
  newTaskBtn.style.fontWeight = "normal"; // Set it back to the original value
  newTaskBtn.style.transform = "rotate(-3deg)"; // Reset the scale
});

newUserScribble.addEventListener("mouseenter", function () {
  newUserBtn.style.fontWeight = "bold";
  newUserBtn.style.transform = "rotate(0deg)";
});

newUserScribble.addEventListener("mouseleave", function () {
  newUserBtn.style.fontWeight = "normal"; // Set it back to the original value
  newUserBtn.style.transform = "rotate(5deg)"; // Reset the scale
});

//UPDATE PAGE WITH LOCAL STORAGE
const updatePageOnStorageChange = () => {
  displayTasks();
  updateSelectOptions();
};
window.addEventListener("storage", updatePageOnStorageChange);

// POP UP WINDOW
const showNewUser = () => {
  newUserBox.style.display = "block";
  newTaskBox.style.display = "none";
};

const showNewTask = () => {
  if (userSelect.value === "") {
    return;
  }
  newTaskBox.style.display = "block";
  newUserBox.style.display = "none";
};

const newBoxHide = () => {
  newUserBox.style.display = "none";
  newTaskBox.style.display = "none";
};

const preventDefault = (event) => {
  event.preventDefault();
};

newUserScribble.addEventListener("click", showNewUser);
newTaskScribble.addEventListener("click", showNewTask);
newUserSubmit.addEventListener("click", preventDefault);
newTaskSubmit.addEventListener("click", preventDefault);

crosses.forEach((cross) => {
  cross.addEventListener("click", newBoxHide);
});

//CREATE LOCAL STORAGE

const createLocalStorage = () => {
  const username = document.getElementById("new-user").value;
  if (username !== "") {
    // Retrieve existing data for the username
    const existingData = localStorage.getItem(username);

    // Check if existing data is present and is an array
    const userData = existingData ? JSON.parse(existingData) : [];

    // Create a local storage entry with the username as the key and userData as the value
    localStorage.setItem(username, JSON.stringify(userData));

    alert(username + " added!");
  } else {
    alert("Please enter a username.");
  }
  updatePageOnStorageChange();
};

newUserSubmit.addEventListener("click", createLocalStorage);

//USER SELECT

let selectedUser; // Variable to store the currently selected user

const updateSelectOptions = () => {
  selectedUser = userSelect.value; // Store the currently selected user

  userSelect.innerHTML = ""; // Clear existing options

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select a user";
  userSelect.appendChild(defaultOption);

  // Repopulate the userSelect options based on localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    const option = document.createElement("option");
    option.value = key;
    option.textContent = key;

    userSelect.appendChild(option);
  }

  // Set back the selected user
  userSelect.value = selectedUser;
};

updateSelectOptions();

newTaskScribble.addEventListener("click", function () {
  if (userSelect.value === "") {
    // Apply temporary styles
    userSelect.style.color = "red";
    userSelect.style.transform = "scale(1.12)";
    userSelect.style.marginRight = "20px";

    // Revert styles after 500 milliseconds (0.5 second)
    setTimeout(function () {
      userSelect.style.color = ""; // Revert to the default color
      userSelect.style.transform = ""; // Revert to the default transform
      userSelect.style.marginRight = "0";
    }, 800);
  }
});

//ADD TASK TO LOCAL

const addNewTask = (event) => {
  const username = userSelect.value;
  if (username !== "" && newTask.value !== "") {
    const userTasks = JSON.parse(localStorage.getItem(username)) || [];
    userTasks.push(newTask.value);
    localStorage.setItem(username, JSON.stringify(userTasks));
  } else {
    alert("Please enter a task.");
  }
  updatePageOnStorageChange();
};

newTaskSubmit.addEventListener("click", addNewTask);

// DISPLAY TASKS

const displayTasks = () => {
  const userTasks = JSON.parse(localStorage.getItem(userSelect.value)) || [];

  if (userTasks.length === 0) {
    tasks.innerHTML = `<h4>No current tasks</h4><hr>`;
  } else {
    tasks.innerHTML = "";
  }

  for (let i = 0; i < userTasks.length; i++) {
    const task = userTasks[i];

    // Set initial state of data-isImage1 attribute
    let isImage1 = true;

    // Check if isImage1 is false, and apply strike-through style
    const strikeThroughStyle = isImage1 ? "" : "text-decoration: line-through;";

    tasks.innerHTML += `<div class="task-bullet">
      <img class="bullet-point" src="images/scribble-bullet-point.png" data-isImage1="${isImage1}" />
      <h4 style="${strikeThroughStyle}">${task}</h4></div><hr />`; // Concatenate the HTML for each task
  }
};
updatePageOnStorageChange();
userSelect.addEventListener("change", displayTasks);

// CHANGE BULLET-POINT IMG AND STYLING

tasks.addEventListener("click", function (event) {
  const clickedElement = event.target;

  // Check if the clicked element is a bullet point
  if (clickedElement.classList.contains("bullet-point")) {
    let isImage1 = clickedElement.getAttribute("data-isImage1") === "true";

    if (isImage1) {
      clickedElement.src = "images/scribble-bullet-point-filled.png";
    } else {
      clickedElement.src = "images/scribble-bullet-point.png";
    }

    isImage1 = !isImage1;
    clickedElement.setAttribute("data-isImage1", isImage1.toString());

    // Find the parent task element of the clicked bullet point
    const taskElement = clickedElement.closest(".task-bullet");

    // Check if isImage1 is false and adjust the styling
    if (!isImage1) {
      taskElement.querySelector("h4").style.textDecoration = "line-through";
    } else {
      taskElement.querySelector("h4").style.textDecoration = "none";
    }
  }
});
