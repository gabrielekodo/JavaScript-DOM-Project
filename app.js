// SELECTING ELEMENTS
const formElement = document.querySelector(".form-element");
const taskContainer = document.querySelector(".task-container");
const taskList = document.querySelector(".task-list");
const task = document.querySelector("#task");
const submitBtn = document.querySelector(".submit-btn");
const clearTasksBtn = document.querySelector(".clear-tasks");
const alerts = document.querySelector(".alert");

// variables
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
    console.log(yourTask);

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
                            <i class="fa  fa-pencil-square " aria-hidden="true">EDIT</i></button><button class="delete">
                            <i class="fa fa-trash" aria-hidden="true">DEL</i></button>
                    </div>
    `;

    taskList.appendChild(element);
    addToLocalSorage(id, value);
    // const deleteBtn = document.querySelector(".delete");
    // const editBtn = document.querySelector(".edit");
    // deleteBtn.addEventListener("click", deleteTask);
    // editBtn.addEventListener("click", editTask);
    displayAlert("Task added succesfully", "success");
    setDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("Task edited", "success");
    // edit local storage
    editLocalStorage(editID, value);
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
const addToLocalSorage = (id, value) => {
  let myTask = { id, value };
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
  console.log(list, newList);
};

// edit local storage
const editLocalStorage = (id, task) => {
  //iterate array from LS
  const list = JSON.parse(localStorage.getItem("tasks"));
  //filter objects in array
  let toBeUpdated = list.find((task) => task.id === id);
  toBeUpdated.value = task;
  console.log(toBeUpdated.value);
  console.log(list);
  // filter out task from Local Storage
  localStorage.setItem("tasks", JSON.stringify(list));
  //update task Object

  // push back to array

  //persist to local staorage

  console.log("edit stored succesfully....");
};
//delete task
const deleteTask = (e) => {
  const taskElement = e.target.parentElement.parentElement.parentElement;
  const id = taskElement.dataset.id;
  if (e.target.parentElement.classList.contains("delete")) {
    taskElement.parentElement.removeChild(taskElement);

    removeFromLocalStorage(id);
  }

  displayAlert("Task deleted", "danger");
  setDefault();
};
//edit task
const editTask = (e) => {
  const taskElement = e.target.parentElement.parentElement.parentElement;
  editElement = taskElement.firstElementChild;

  task.value = editElement.innerText;
  editFlag = true;
  editID = taskElement.dataset.id;

  if (e.target.parentElement.classList.contains("edit")) {
    //selecting task and adding it to input field
    console.log(editElement, editID);
    document.querySelector("#task").value = editElement.innerHTML;
    submitBtn.value = "EDIT";
  }

  displayAlert("Task Edited", "success");
};

// LOAD DOM CONTENT
const loadTasksFromStorage = () => {
  const list = JSON.parse(localStorage.getItem("tasks"));

  if (list.length > 0) {
    list.forEach((item) => {
      const element = document.createElement("div");
      element.classList.add("task");
      // add attribute
      const attribute = document.createAttribute("data-id");
      attribute.value = item.id;
      element.setAttributeNode(attribute);

      element.innerHTML = `
     <p>${item.value}</p>
                    <div class="btn-container">
                        <button class="edit">
                            <i class="fa  fa-pencil-square " aria-hidden="true">EDIT</i></button><button class="delete">
                            <i class="fa fa-trash" aria-hidden="true">DEL</i></button>
                    </div>
    `;

      taskList.appendChild(element);
      clearTasksBtn.textContent = "Clear Tasks";
    });
  } else {
    clearTasksBtn.textContent = "No Tasks Available";
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

// LOAD DOM CONTENT
window.addEventListener("DOMContentLoaded", loadTasksFromStorage);
