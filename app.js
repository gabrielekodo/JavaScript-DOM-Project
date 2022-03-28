const form = document.querySelector("form");
const taskContainer = document.querySelector(".items-group");

// EVENT LISTENERS
let tasks;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let task = document.querySelector("#task").value;
  document.querySelector(".tasks-group").innerHTML += `

<li>${task} <i class="fa fa-trash" aria-hidden="true" id="delete"></i>
                        <i class="fa fa-pencil-square" aria-hidden="true" id="edit"></i>
                    </li>


`;
  task = " ";
});
