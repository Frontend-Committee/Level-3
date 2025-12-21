const followList = JSON.parse(localStorage.getItem("accounts")) || [
  // ===== PEOPLE =====
  {
    id: 1,
    name: "la femme dans l'art",
    email: "@femmeduatar",
    about: "for ads and inquiries & If you want to post your pics",
    type: "people",
    isFollowed: false,
  },
  {
    id: 2,
    name: "Ahmed Samy",
    email: "@ahmedsamy",
    about: "Frontend developer & JavaScript enthusiast",
    type: "people",
    isFollowed: false,
  },
  {
    id: 3,
    name: "Sara Ali",
    email: "@sara.codes",
    about: "UI/UX designer sharing daily tips and inspiration",
    type: "people",
    isFollowed: false,
  },
  {
    id: 4,
    name: "Omar Hassan",
    email: "@omar.dev",
    about: "Learning React and building cool projects",
    type: "people",
    isFollowed: false,
  },
  {
    id: 5,
    name: "Mona Adel",
    email: "@mona.designs",
    about: "Graphic designer & branding specialist",
    type: "people",
    isFollowed: false,
  },
  {
    id: 6,
    name: "Youssef Khaled",
    email: "@youssefk",
    about: "CS student | problem solving lover",
    type: "people",
    isFollowed: false,
  },
  {
    id: 7,
    name: "Nour Mohamed",
    email: "@nour.tech",
    about: "Sharing my journey in tech & self learning",
    type: "people",
    isFollowed: false,
  },

  // ===== CREATORS =====
  {
    id: 8,
    name: "Code Creators",
    email: "@codecreators",
    about: "Learn web development from scratch",
    type: "creators",
    isFollowed: false,
  },
  {
    id: 9,
    name: "Design Hub",
    email: "@designhub",
    about: "Daily design inspiration & UI resources",
    type: "creators",
    isFollowed: false,
  },
  {
    id: 10,
    name: "JS Mastery",
    email: "@jsmastery",
    about: "Advanced JavaScript tutorials and real projects",
    type: "creators",
    isFollowed: false,
  },
  {
    id: 11,
    name: "Frontend World",
    email: "@frontendworld",
    about: "Everything about HTML, CSS, and JavaScript",
    type: "creators",
    isFollowed: false,
  },
  {
    id: 12,
    name: "React Daily",
    email: "@reactdaily",
    about: "Tips, hooks, and best practices for React",
    type: "creators",
    isFollowed: false,
  },
  {
    id: 13,
    name: "UI Trends",
    email: "@uitrends",
    about: "Latest UI/UX trends and design systems",
    type: "creators",
    isFollowed: false,
  },
  {
    id: 14,
    name: "Tech Explained",
    email: "@techexplained",
    about: "Complex tech concepts explained simply",
    type: "creators",
    isFollowed: false,
  },
];

const follow = document.querySelector(".follow-group");
const people = document.querySelector(".people");
const creators = document.querySelector(".creators");
let currentPage = localStorage.getItem("page") || "people";
people.classList.toggle("active-btn", currentPage === "people");
creators.classList.toggle("active-btn", currentPage === "creators");

function renderConnect(page) {
  let filteredList = [];
  currentPage = page;
  localStorage.setItem("page", page);
  switch (page) {
    case "people":
      filteredList = followList.filter((f) => f.type === "people");

      break;
    case "creators":
      filteredList = followList.filter((f) => f.type === "creators");
      break;
  }
  follow.innerHTML = "";
  filteredList.forEach((acc) => {
    follow.innerHTML += `
    <div class="account p-3" data-id=${acc.id}>
     <div class="up-sec">
              <div class="user-info">
                <div class="profile-pic">
                  <img
                    class="img-fluid rounded-pill"
                    src="photos/download.jpg"
                    alt=""
                  />
                </div>
                <div class="account ps-3">
                  <div class="username fw-bold fs-6">${acc.name}</div>
                  <div class="email">${acc.email}</div>
                </div>
              </div>
              <div class="follow-button">
                <button class="btn ${
                  acc.isFollowed ? "btn-outline-dark" : "btn-dark"
                } rounded-pill js-follow-btn">${
      acc.isFollowed ? "Followed" : "Follow"
    }</button>
              </div>
            </div>
            <div class="down-sec mt-3 ms-5 ps-5">
              <p>${acc.about}</p>
            </div>
            </div>
    `;
  });
}

people.addEventListener("click", () => {
  people.classList.add("active-btn");
  creators.classList.remove("active-btn");
  renderConnect("people");
});

creators.addEventListener("click", () => {
  creators.classList.add("active-btn");
  people.classList.remove("active-btn");
  renderConnect("creators");
});

follow.addEventListener("click", (e) => {
  if (!e.target.classList.contains("js-follow-btn")) return;

  const accountEl = e.target.closest(".account");
  const accountId = parseInt(accountEl.dataset.id);

  const account = followList.find((acc) => acc.id === accountId);
  account.isFollowed = !account.isFollowed;
  e.target.innerText = account.isFollowed ? "Followed" : "Follow";
  e.target.classList.toggle("btn-dark");
  e.target.classList.toggle("btn-outline-dark");
  localStorage.setItem("accounts", JSON.stringify(followList));
});

renderConnect(currentPage);
