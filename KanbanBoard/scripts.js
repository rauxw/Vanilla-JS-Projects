const kanbanData = JSON.parse(localStorage.getItem("kanbanData")) || {
  todo: [
    {
      id: 1,
      title: "Design Login Page",
      description: "Create UI for login and signup screens",
      priority: "high",
      createdAt: "2026-03-19",
    },
    {
      id: 2,
      title: "Setup Backend",
      description: "Initialize Node.js server and routes",
      priority: "medium",
      createdAt: "2026-03-18",
    },
  ],

  inProgress: [
    {
      id: 3,
      title: "API Integration",
      description: "Connect frontend with backend APIs",
      priority: "high",
      createdAt: "2026-03-17",
    },
  ],

  completed: [
    {
      id: 4,
      title: "Project Setup",
      description: "Initialize project structure",
      priority: "low",
      createdAt: "2026-03-15",
    },
  ],
};

function saveData() {
  localStorage.setItem("kanbanData", JSON.stringify(kanbanData));
}

const addTodoBtnEl = document.getElementById("add-todo-btn");

function openAddTodoModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <select id="priority-select">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input type="text" id="modal-title" placeholder="Enter title"/>
      <textarea type="text" id="modal-textarea" placeholder="Enter note..."></textarea>
      <div class="modal-btns-div">
        <button class="modal-btn" id="save-modal-btn">Save</button>
        <button class="modal-btn" id="close-modal-btn">Cancel</button>
      </div>
    </div>
  `;

  document.body.append(modal);

  modal.querySelector("#close-modal-btn").addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector("#save-modal-btn").addEventListener("click", () => {
    const priority = document.getElementById("priority-select").value;
    const title = document.getElementById("modal-title").value;
    const description = document.getElementById("modal-textarea").value;
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = yyyy + "-" + mm + "-" + dd;

    if (!priority || !title || !description) {
      alert("All values must be filled");
      return;
    }

    const newCard = {
      id: Date.now(),
      title: title,
      description: description,
      priority: priority,
      createdAt: formattedToday,
    };

    kanbanData.todo.push(newCard);
    saveData();
    renderAll();
    modal.remove();
  });
}

addTodoBtnEl.addEventListener("click", openAddTodoModal);

function renderCards(columnData, containerClass) {
  const container = document.querySelector(containerClass);
  container.innerHTML = "";

  columnData.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    cardDiv.setAttribute("draggable", "true");

    cardDiv.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("cardId", card.id);
    });

    cardDiv.innerHTML = `
      <div class="card-body">
        <div class="card-priority-${card.priority}">${
      card.priority.charAt(0).toUpperCase() + card.priority.slice(1)
    }
        </div>
        <div class="card-title">${card.title}</div>
        <div class="card-note">Note: ${card.description}</div>
      </div>
      <div class="card-footer">
        <div class="card-date">${card.createdAt}</div>
        <button class="card-delete-btn" data-id="${card.id}">delete</button>
      </div>

    `;

    cardDiv.querySelectorAll(".card-delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        deleteCard(id);
      });
    });

    container.appendChild(cardDiv);
  });
}

function deleteCard(id) {
  Object.keys(kanbanData).forEach((key) => {
    kanbanData[key] = kanbanData[key].filter((card) => card.id !== Number(id));
  });
  saveData();
  renderAll();
}

function renderAll() {
  renderCards(kanbanData.todo, ".todo-content");
  renderCards(kanbanData.inProgress, ".progress-content");
  renderCards(kanbanData.completed, ".complete-content");
}

// Drag and Drop

const columns = document.querySelectorAll(
  ".todo-content, .progress-content, .complete-content"
);

columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  console.log(column);
  column.addEventListener("drop", (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    moveCard(cardId, column);
  });
});

function moveCard(cardId, newColumn) {
  let movedCard = null;

  Object.keys(kanbanData).forEach((key) => {
    kanbanData[key] = kanbanData[key].filter((card) => {
      if (card.id == cardId) {
        movedCard = card;
        return false;
      }
      return true;
    });
  });

  if (newColumn.classList.contains("todo-content")) {
    kanbanData.todo.push(movedCard);
  } else if (newColumn.classList.contains("progress-content")) {
    kanbanData.inProgress.push(movedCard);
  } else if (newColumn.classList.contains("complete-content")) {
    kanbanData.completed.push(movedCard);
  }
  saveData();
  renderAll();
}

renderAll();
