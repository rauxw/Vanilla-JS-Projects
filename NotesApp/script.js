let notes = [
  {
    id: 1,
    title: "Tech Stack",
    content:
      "Learn Node.js, Express, MongoDB, Redis, Kafka and System Design concepts for backend interviews.",
    date: "20/08/25",
  },
  {
    id: 2,
    title: "DSA Practice",
    content:
      "Solve arrays, linked list, trees and graph problems daily. Focus on LeetCode medium questions.",
    date: "21/08/25",
  },
  {
    id: 3,
    title: "System Design",
    content:
      "Study load balancing, caching, sharding, database indexing and design scalable systems like Twitter.",
    date: "22/08/25",
  },
  {
    id: 4,
    title: "JavaScript",
    content:
      "Master closures, promises, async/await, event loop and prototype inheritance.",
    date: "23/08/25",
  },
  {
    id: 5,
    title: "Backend Project",
    content:
      "Build a Notes App using Node.js, Express and MongoDB with authentication and REST APIs.",
    date: "24/08/25",
  },
  {
    id: 6,
    title: "Kafka",
    content:
      "Understand producers, consumers, topics, partitions and message streaming architecture.",
    date: "25/08/25",
  },
  {
    id: 7,
    title: "RabbitMQ",
    content:
      "Learn message queues, exchanges, routing keys and build async communication between services.",
    date: "26/08/25",
  },
  {
    id: 8,
    title: "Database",
    content:
      "Study SQL joins, indexing, normalization and NoSQL concepts like document-based storage.",
    date: "27/08/25",
  },
  {
    id: 9,
    title: "Interview Prep",
    content:
      "Revise core subjects: DBMS, OS, Networking and practice mock interviews.",
    date: "28/08/25",
  },
];

// Add btn
const addBtnEl = document.getElementById("create-note-btn-el");

function openAddModalNote() {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <input id="title-add-modal" type="text" placeholder="Title" />
      <textarea id="textarea-add-modal" placeholder="Write note..."></textarea>
      <div class="add-modal-note-btn-div">
        <button id="save-btn-modal">Save Note</button>
        <button id="close-btn-modal">Close</button>
      </div>
    </div>
  `;

  document.body.append(modal);

  modal.querySelector("#close-btn-modal").addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector("#save-btn-modal").addEventListener("click", () => {
    const title = document.getElementById("title-add-modal").value;
    const content = document.getElementById("textarea-add-modal").value;
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;

    if (!title || !content) {
      alert("Please enter title and content to save");
      return;
    }

    notes.push({
      id: Date.now(),
      title: title,
      content: content,
      date: formattedToday,
    });
    loadNotesCards();
    modal.remove();
  });
}

addBtnEl.addEventListener("click", openAddModalNote);

function openViewModalSelectedCard(id) {
  const note = notes.find((n) => n.id === Number(id));
  console.log(note);
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-title-view">${note.title}</div>
      <p class="content-view">${note.content}</p>
      <p>Date: ${note.date}</p>
      <button id="close-view-btn-modal">Close</button>
    </div>
  `;

  document.body.append(modal);

  modal.querySelector("#close-view-btn-modal").addEventListener("click", () => {
    modal.remove();
  });
}

function openEditModalSelectedCard(id) {
  const note = notes.find((n) => n.id === Number(id));
  console.log(note);

  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <input id="title-edit-modal" type="text" placeholder="Title" value="${note.title}"/>
      <textarea id="textarea-edit-modal" placeholder="Write note...">${note.content}</textarea>
      <p>Date: ${note.date}</p>
      <div class="add-modal-note-btn-div">
        <button id="edit-save-btn-modal">Save Note</button>
        <button id="edit-close-btn-modal">Close</button>
      </div>
    </div>
  `;

  document.body.append(modal);

  modal.querySelector("#edit-close-btn-modal").addEventListener("click", () => {
    modal.remove();
  });

  modal.querySelector("#edit-save-btn-modal").addEventListener("click", () => {
    const title = document.querySelector("#title-edit-modal").value;
    const content = document.querySelector("#textarea-edit-modal").value;
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;

    if (!title || !content) {
      alert("title and content cannot be blank");
      return;
    }

    notes = notes.map((n) => {
      if (n.id === Number(id)) {
        return {
          ...n,
          title: title,
          content: content,
          date: formattedToday,
        };
      }
      return n;
    });
    loadNotesCards();
    modal.remove();
  });
}

// Container
const container = document.querySelector(".container");

function loadNotesCards() {
  container.innerHTML = "";
  notes.forEach((note) => {
    container.innerHTML += `
      <div class="note-card">
          <div class="content-preview">
            ${note.content}
          </div>
          <div class="action-btns">
            <button class="view-btn-el" data-id="${note.id}">View</button>
            <button class="edit-btn-el" data-id="${note.id}">Edit</button>
            <button class="delete-btn-el" data-id="${note.id}">Delete</button>
          </div>
          <div class="note-card-footer">
            <div class="content-title">${note.title}</div>
            <div class="content-date">${note.date}</div>
          </div>
        </div>
    `;
  });

  container.querySelectorAll(".view-btn-el").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      openViewModalSelectedCard(id);
    });
  });

  container.querySelectorAll(".edit-btn-el").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      openEditModalSelectedCard(id);
    });
  });

  container.querySelectorAll(".delete-btn-el").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      notes = notes.filter((note) => note.id !== Number(id));
      loadNotesCards();
    });
  });
}

loadNotesCards();
