const displayContainerEl = document.getElementById("display-container-el");
const inputTodoEl = document.getElementById("todo-el");
const addBtnEl = document.getElementById("add-btn-el");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoElementDiv(todoText, index) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task");

  const taskTextContainer = document.createElement("div");
  taskTextContainer.classList.add("task-txt");
  taskTextContainer.textContent = todoText;

  taskTextContainer.addEventListener("click", function () {
    taskTextContainer.classList.remove("task-text");
    taskTextContainer.classList.add("task-complete");
  });

  const taskDeleteBtn = document.createElement("button");
  taskDeleteBtn.classList.add("delete-btn");
  taskDeleteBtn.textContent = "Delete";

  taskDeleteBtn.addEventListener("click", function () {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  });

  taskContainer.appendChild(taskTextContainer);
  taskContainer.appendChild(taskDeleteBtn);

  displayContainerEl.appendChild(taskContainer);

  inputTodoEl.value = "";
}

function renderTodos() {
  displayContainerEl.innerHTML = "";
  todos.forEach((todo, index) => {
    createTodoElementDiv(todo, index);
  });
}

addBtnEl.addEventListener("click", function () {
  const todoText = inputTodoEl.value;
  if (todoText.trim() == "") {
    return;
  }
  todos.push(todoText);
  saveTodos();
  renderTodos();
});

renderTodos();
