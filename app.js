// SELECTING ELEMENTS
const formElement = document.querySelector(".form-element");
const taskContainer = document.querySelector(".task-container");
const taskList = document.querySelector(".task-list");
const task = document.querySelector("#task");
const submitBtn = document.querySelector(".submit-btn");
const clearTasksBtn = document.querySelector(".clear-tasks");
const completedBtn = document.querySelector(".completed");
const alerts = document.querySelector(".alert");

// variables
let completed = false;
let editElement;
let editFlag = false;
let editID = "";

// FUNCTIONS
const addTask = (e) => {
  e.preventDefault();
  const id = Date.now().toString();
  const value = task.value;

  if (value && !editFlag) {
    const yourTask = { id, task: value };
    // console.log(yourTask);

    const element = document.createElement("div");
    element.classList.add("task");
    // add attribute
    const attribute = document.createAttribute("data-id");
    attribute.value = id;
    element.setAttributeNode(attribute);

    element.innerHTML = `
   
    <p>${value}</p>
                    <div class="btn-container">
                        <button class="edit">
                            <i class="fa  fa-pencil-square " aria-hidden="true"></i></button><button class="delete">
                            <i class="fa fa-trash" aria-hidden="true"></i></button>
                            <button class="completed">
                            <i class="fa fa-check-square" aria-hidden="true"></i></button>
                            
                    </div>
    `;

    taskList.appendChild(element);
    addToLocalSorage(id, value);
    clearTasksBtn.style.display = "block";
    displayAlert("Task added succesfully", "success");
    setDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    // edit local storage
    editLocalStorage(editID, value);
    displayAlert("Task edited", "success");
    setDefault();
  } else {
    displayAlert("Enter Task", "danger");
  }
};

// clear tasks
const clearTasks = (e) => {
  const tasks = document.querySelectorAll(".task");
  if (tasks.length > 0) {
    tasks.forEach((task) => {
      taskList.removeChild(task);
    });
  }
  clearTasksBtn.style.display = "none";
  displayAlert("Tasks Cleared", "danger");
  localStorage.removeItem("tasks");
};
// display alert
const displayAlert = (text, alert) => {
  alerts.textContent = text;
  alerts.classList.add(`alert-${alert}`);
  setTimeout(() => {
    alerts.textContent = "";
    alerts.classList.remove(`alert-${alert}`);
  }, 1000);
};

// set default
const setDefault = () => {
  (editFlag = false), (editID = "");
  task.value = "";
  submitBtn.value = "ADD TASK";
};

//add to local storage
const addToLocalSorage = (id, value, status) => {
  let myTask = { id, value, completed };
  let taskArray;
  if (localStorage.getItem("tasks") === null) {
    taskArray = [];
  } else {
    taskArray = JSON.parse(localStorage.getItem("tasks"));
  }
  taskArray.push(myTask);
  localStorage.setItem("tasks", JSON.stringify(taskArray));
};
//remove from LS
const removeFromLocalStorage = (id) => {
  //iterate array from LS
  const list = JSON.parse(localStorage.getItem("tasks"));
  //filter objects in array
  const newList = list.filter((item) => item.id != id);
  //update local storage
  localStorage.setItem("tasks", JSON.stringify(newList));
};

// edit local storage
const editLocalStorage = (id, task, status) => {
  //iterate array from LS
  const list = JSON.parse(localStorage.getItem("tasks"));
  //filter objects in array
  let toBeUpdated = list.find((task) => task.id === id);
  toBeUpdated.value = task;

  toBeUpdated.completed = status;
  console.log(toBeUpdated);

  // filter out task from Local Storage
  localStorage.setItem("tasks", JSON.stringify(list));
};
//delete task
const deleteTask = (e) => {
  if (e.target.parentElement.classList.contains("delete")) {
    const taskElement = e.target.parentElement.parentElement.parentElement;
    const id = taskElement.dataset.id;
    editFlag = false;
    taskElement.parentElement.removeChild(taskElement);

    removeFromLocalStorage(id);
    displayAlert("Task deleted", "danger");
    setDefault();
  }
};
//edit task
const editTask = (e) => {
  if (e.target.parentElement.classList.contains("edit")) {
    const taskElement = e.target.parentElement.parentElement.parentElement;
    editElement = taskElement.firstElementChild;

    task.value = editElement.innerText;

    editFlag = true;
    editID = taskElement.dataset.id;
    //selecting task and adding it to input field

    document.querySelector("#task").value = editElement.innerHTML;
    submitBtn.value = "EDIT";
  }
};

// mark as completed
const taskCompleted = (e) => {
  if (e.target.parentElement.classList.contains("completed")) {
    const taskElement = e.target.parentElement.parentElement.parentElement;
    editElement = taskElement.firstElementChild;
    editElement.classList.add("completed");
    //  editElement.innerText;
    editFlag = true;
    completed = true;
    editID = taskElement.dataset.id;
    editLocalStorage(editID, editElement.innerText, completed);
    //selecting task and adding it to input field

    //  document.querySelector("#task").value = editElement.innerHTML;
    //  submitBtn.value = "EDIT";
  }
};

// LOAD DOM CONTENT
const loadTasksFromStorage = () => {
  const list = JSON.parse(localStorage.getItem("tasks"));

  if (localStorage.getItem("tasks") !== null && list.length > 0) {
    list.forEach((item) => {
      const element = document.createElement("div");
      element.classList.add("task");
      // add attribute
      const attribute = document.createAttribute("data-id");
      attribute.value = item.id;
      element.setAttributeNode(attribute);

      element.innerHTML = `
      
     <p class="${item.completed ? "completed" : ""}">${item.value}</p>
                    <div class="btn-container">
                        <button class="edit">
                            <i class="fa  fa-pencil-square " aria-hidden="true"></i></button><button class="delete">
                            <i class="fa fa-trash" aria-hidden="true"></i></button>
                            <button class="completed">
                            <i class="fa fa-check-square" aria-hidden="true"></i></button>
                    </div>
    `;

      taskList.appendChild(element);
      clearTasksBtn.style.display = "block";
    });
  } else {
    clearTasksBtn.style.display = "none";
  }
};

// ADDING EVENT LISTENERS
// submit form
formElement.addEventListener("submit", addTask);
// clear tasks
clearTasksBtn.addEventListener("click", clearTasks);

// delete task
taskList.addEventListener("click", deleteTask);

// edit task
taskList.addEventListener("click", editTask);

// completed task
taskList.addEventListener("click", taskCompleted);
// LOAD DOM CONTENT
window.addEventListener("DOMContentLoaded", loadTasksFromStorage);
