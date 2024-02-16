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
const redCross = document.querySelector(".cross-red");
const uncompletedTasksTitle = document.createElement("div");
const completedTasksTitle = document.createElement("div");
const uncompletedTasks = document.querySelector(".uncompleted-tasks");
const completedTasks = document.querySelector(".completed-tasks");
let username = userSelect.value;
let isImage1 = true;
let selectedUser;

//UPDATE PAGE WITH LOCAL STORAGE
const updatePageOnStorageChange = () => {
  displayTasks();
  updateSelectOptions();
};

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

//CREATE LOCAL STORAGE

const createNewUser = () => {
  const username = document.getElementById("new-user").value;
  if (username !== "") {
    const existingData = localStorage.getItem(username);

    const userData = existingData ? JSON.parse(existingData) : [];

    localStorage.setItem(username, JSON.stringify(userData));

    alert(username + " added!");
  } else {
    alert("Please enter a username.");
  }
  updatePageOnStorageChange();
};

newUserSubmit.addEventListener("click", createNewUser);

//USER SELECT

const updateSelectOptions = () => {
  selectedUser = userSelect.value;

  userSelect.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "User select";
  userSelect.appendChild(defaultOption);

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    const option = document.createElement("option");
    option.value = key;
    option.textContent = key;

    userSelect.appendChild(option);
  }
  userSelect.value = selectedUser;

  for (let i = 0; i < userSelect.options.length; i++) {
    if (userSelect.options[i].value.includes("_completed_tasks")) {
      userSelect.options[i].style.display = "none";
    }
  }
};

newTaskScribble.addEventListener("click", function () {
  if (userSelect.value === "") {
    userSelect.style.color = "red";
    userSelect.style.transform = "scale(1.12)";
    userSelect.style.marginRight = "20px";

    setTimeout(function () {
      userSelect.style.color = "";
      userSelect.style.transform = "";
      userSelect.style.marginRight = "0";
    }, 800);
  }
});

// Call the function to initially update and hide options
updateSelectOptions();

//ADD TASK TO LOCAL

const addNewTask = (event) => {
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

const displayTasks = (event) => {
  username = username ? username : event?.target?.value;
  const completedTasksArray =
    JSON.parse(localStorage.getItem(`${username}_completed_tasks`)) || [];
  const userTasks = JSON.parse(localStorage.getItem(userSelect.value)) || [];
  // console.log(`${userSelect.value}_completed_tasks`);
  if (userTasks.length === 0 && completedTasksArray.length === 0) {
    uncompletedTasks.innerHTML = `<h4>No current tasks</h4><hr>`;
    completedTasks.remove();
  } else {
    uncompletedTasksTitle.classList.add("uncompleted-tasks__title");
    completedTasksTitle.classList.add("completed-tasks__title");
    const uncompletedTasksCount = userTasks.length;
    const completedTasksCount = completedTasksArray.length;
    uncompletedTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    tasks.insertBefore(completedTasks, tasks.lastChild);
    uncompletedTasks.appendChild(uncompletedTasksTitle);
    completedTasks.appendChild(completedTasksTitle);
    uncompletedTasksTitle.innerHTML = `Uncompleted Tasks: ${uncompletedTasksCount}`;
    completedTasksTitle.innerHTML = `Completed Tasks: ${completedTasksCount}`;
  }

  for (let i = 0; i < userTasks.length; i++) {
    const task = userTasks[i];

    uncompletedTasks.innerHTML += `<div class="task-bullet">
      <img class="bullet-point" src="images/scribble-bullet-point.png" data-isImage1="${isImage1}" />
      <h4>${task}</h4><div class="cross-red__container"><img class="cross-red" src="images/cross-red.png"></div></div>`;
  }

  for (let i = 0; i < completedTasksArray.length; i++) {
    const task = completedTasksArray[i];
    const strikeThroughStyle = "text-decoration: line-through;";
    completedTasks.innerHTML += `<div class="task-bullet">
    <img class="bullet-point" src="images/scribble-bullet-point-filled.png" data-isImage1="${!isImage1}" />
    <h4 style="${strikeThroughStyle}">${task}</h4><div class="cross-red__container"><img class="cross-red" src="images/cross-red.png"></div></div>`;
  }
};

// CHANGE BULLET-POINT IMG AND STYLING

tasks.addEventListener("click", function (event) {
  const clickedElement = event.target;
  const taskElement = clickedElement.closest(".task-bullet");
  const taskText = taskElement.querySelector("h4").textContent;
  const storedCompletedTasks =
    JSON.parse(localStorage.getItem(`${username}_completed_tasks`)) || [];
  const removeCompletedTask = JSON.parse(localStorage.getItem(username)) || [];
  const updatedCompletedTasks = removeCompletedTask.filter(
    (task) => task !== taskText
  );
  const updatedTasks = storedCompletedTasks.filter((task) => task !== taskText);

  if (clickedElement.classList.contains("bullet-point")) {
    let isImage1 = clickedElement.getAttribute("data-isImage1") === "true";

    if (isImage1) {
      clickedElement.src = "images/scribble-bullet-point-filled.png";
      clickableSound = clickSound1;
    } else {
      clickedElement.src = "images/scribble-bullet-point.png";
      clickableSound = clickSound2;
    }
    clickableSound.play();
    isImage1 = !isImage1;
    clickedElement.setAttribute("data-isImage1", isImage1.toString());

    if (!isImage1) {
      storedCompletedTasks.push(taskText);
      localStorage.setItem(
        `${username}_completed_tasks`,
        JSON.stringify(storedCompletedTasks)
      );
      localStorage.setItem(username, JSON.stringify(updatedCompletedTasks));
    } else {
      removeCompletedTask.push(taskText);
      localStorage.setItem(username, JSON.stringify(removeCompletedTask));
      localStorage.setItem(
        `${username}_completed_tasks`,
        JSON.stringify(updatedTasks)
      );
    }
  }
  updatePageOnStorageChange();
});

//EVENT LISTENERS

tasks.addEventListener("click", function (event) {
  const clickedElement = event.target;
  const taskElement = clickedElement.closest(".task-bullet");
  const taskText = taskElement.querySelector("h4").textContent;

  if (clickedElement.classList.contains("cross-red")) {
    const storedTasks = JSON.parse(localStorage.getItem(username)) || [];
    const updatedTasks = storedTasks.filter((task) => task !== taskText);
    const storedCompletedTasks =
      JSON.parse(localStorage.getItem(`${username}_completed_tasks`)) || [];
    const updatedCompletedTasks = storedCompletedTasks.filter(
      (task) => task !== taskText
    );
    localStorage.setItem(username, JSON.stringify(updatedTasks));
    localStorage.setItem(
      `${username}_completed_tasks`,
      JSON.stringify(updatedCompletedTasks)
    );

    console.log("Task removed:", taskText);
    updatePageOnStorageChange();
  } else {
    return;
  }
});

userSelect.addEventListener("change", function () {
  username = userSelect.value;
  displayTasks();
});

crosses.forEach((cross) => {
  cross.addEventListener("click", newBoxHide);
});

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
  newTaskBtn.style.fontWeight = "normal";
  newTaskBtn.style.transform = "rotate(-3deg)";
});

newUserScribble.addEventListener("mouseenter", function () {
  newUserBtn.style.fontWeight = "bold";
  newUserBtn.style.transform = "rotate(0deg)";
});

newUserScribble.addEventListener("mouseleave", function () {
  newUserBtn.style.fontWeight = "normal";
  newUserBtn.style.transform = "rotate(5deg)";
});

window.addEventListener("storage", updatePageOnStorageChange);
newUserScribble.addEventListener("click", showNewUser);
newTaskScribble.addEventListener("click", showNewTask);
newUserSubmit.addEventListener("click", preventDefault);
newTaskSubmit.addEventListener("click", preventDefault);

//EXECUTIONS

updateSelectOptions();
updatePageOnStorageChange();
