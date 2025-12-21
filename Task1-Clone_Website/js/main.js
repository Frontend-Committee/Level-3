const existingPosts = [
  {
    id: 1,
    username: "Ebram Ayman",
    topic: "Learning JavaScript and building a Twitter clone 🚀",
    liked: false,
    likesCount: 3,
    type: "forYou",
    comments: [
      {
        username: "Ahmed",
        topic: "Keep going bro 💪",
      },
    ],
  },
  {
    id: 2,
    username: "Sara Mohamed",
    topic: "Frontend development is so fun 😍",
    liked: true,
    likesCount: 12,
    type: "following",
    comments: [],
  },
  {
    id: 3,
    username: "Omar Hassan",
    topic: "Just finished my first React project ⚛️",
    liked: false,
    likesCount: 7,
    type: "forYou",
    comments: [
      {
        username: "Ebram Ayman",
        topic: "Great job 👏",
      },
    ],
  },
  {
    id: 4,
    username: "Mona Ali",
    topic: "Dark mode or light mode? 🤔",
    liked: false,
    likesCount: 5,
    type: "following",
    comments: [],
  },

  {
    id: 5,
    username: "Youssef Khaled",
    topic: "Problem solving daily makes you unstoppable 🧠🔥",
    liked: false,
    likesCount: 9,
    type: "forYou",
    comments: [],
  },
  {
    id: 6,
    username: "Nour Mohamed",
    topic: "Consistency > Motivation 💯",
    liked: true,
    likesCount: 21,
    type: "forYou",
    comments: [
      {
        username: "Sara Mohamed",
        topic: "So true 👌",
      },
    ],
  },
  {
    id: 7,
    username: "Ahmed Samy",
    topic: "CSS Grid finally makes sense 😅",
    liked: false,
    likesCount: 4,
    type: "following",
    comments: [],
  },
  {
    id: 8,
    username: "React Daily",
    topic: "Tip: Always break your UI into small components ⚛️",
    liked: false,
    likesCount: 18,
    type: "forYou",
    comments: [],
  },
  {
    id: 9,
    username: "Design Hub",
    topic: "Good UI is invisible 👀✨",
    liked: true,
    likesCount: 30,
    type: "following",
    comments: [
      {
        username: "Mona Ali",
        topic: "Loved this quote ❤️",
      },
    ],
  },
  {
    id: 10,
    username: "JS Mastery",
    topic: "Closures are not scary once you understand them 😉",
    liked: false,
    likesCount: 25,
    type: "forYou",
    comments: [],
  },
];

const foryouHeader = document.querySelector(".foryou");
const followingHeader = document.querySelector(".following");

let allPosts = JSON.parse(localStorage.getItem("posts")) || existingPosts;

let currentPage = "forYou";

const forYouPosts = existingPosts.filter((posts) => posts.type === "forYou");
const followingPosts = existingPosts.filter(
  (posts) => posts.type === "following"
);

const postBtn = document.querySelector(".post-btn-js");
const postsContainer = document.querySelector(".posts");

foryouHeader.addEventListener("click", () => {
  foryouHeader.classList.add("active-btn");
  followingHeader.classList.remove("active-btn");
  renderPosts("forYou");
});

followingHeader.addEventListener("click", () => {
  followingHeader.classList.add("active-btn");
  foryouHeader.classList.remove("active-btn");
  renderPosts("following");
});
function renderPosts(page) {
  let filteredPosts = [];
  postsContainer.innerHTML = "";
  switch (page) {
    case "forYou":
      filteredPosts = forYouPosts;
      break;
    case "following":
      filteredPosts = followingPosts;
      break;
  }
  filteredPosts.forEach((post, index) => {
    postsContainer.innerHTML += ` <div class="post-card mt-3" data-id=${
      post.id
    }>
            <div
              class="post-info d-flex justify-content-start align-items-start"
            >
              <div class="post-profile-pic">
                <img
                  class="img-fluid rounded-pill"
                  src="./photos/download.jpg"
                  alt=""
                />
              </div>
              <div class="post-topic text-start">
                <h6 class="fw-bold mt-2">${post.username}</h6>
                <p class="m-0 p-0 post-paragraph">${post.topic}</p>
              </div>
            </div>
            <hr />
            <div class="comments d-none">
              <div class="comment-input">
                <div class="d-flex mb-2">
                  <input
                    class="comment-input-js"
                    type="text"
                    placeholder="Write a new comment"
                  />
                  <button
                    class="btn btn-primary rounded-pill my-auto ms-5 add-comment-btn"
                  >
                    Add
                  </button>
                </div>
                <hr />
              </div>
              <div
                class="comment-info "
              >
                
              </div>
            </div>
            <div class="post-reacts text-start">
              <button class="btn btn-dark js-like rounded-pill ${
                post.liked ? "liked" : ""
              }">${post.liked ? "liked" : "like"}</button>
              <button class="btn btn-dark js-comment rounded-pill";
'>
                comment
              </button>
            </div>
          </div>`;
  });
  renderAllComments();
  save();
}
function renderAllComments() {
  const postCards = document.querySelectorAll(".post-card");

  postCards.forEach((card) => {
    const postId = card.dataset.id;
    const post = allPosts.find((p) => p.id == postId);

    const commentContainer = card.querySelector(".comment-info");

    commentContainer.innerHTML = "";
    post.comments.forEach((comment, index) => {
      commentContainer.innerHTML += `
      <div class='comment-card d-flex justify-content-start align-items-start mb-3' data-index=${index}>
        <div class="comment-profile-pic"> 
        <img class="img-fluid rounded-pill" src="./photos/download.jpg" alt="Profile" /> 
        </div> 
        <div class="d-flex justify-content-between align-items-center w-100 px-2" > 
        <div class="comment-topic text-start"> 
        <h6 class="fw-bold mt-2">${comment.username}</h6> 
        <p class="m-0 p-0 post-paragraph">${comment.topic}</p> 
        </div> 
        <div class="delete-button">
        <button class="btn btn-danger js-delete-comment rounded-pill my-auto ms-5"> Delete </button> 
        </div> 
        </div>
      </div>
      `;
    });
  });
}

postsContainer.addEventListener("click", (e) => {
  const postCard = e.target.closest(".post-card");
  if (!postCard) return;

  const postId = postCard.dataset.id;
  const post = allPosts.find((p) => p.id == postId);

  if (e.target.classList.contains("js-comment")) {
    postCard.querySelector(".comments").classList.toggle("show");
  }
  if (e.target.classList.contains("js-like")) {
    const postLike = postCard.querySelector(".js-like");
    post.liked = !post.liked;
    renderPosts(currentPage);
  }
  if (e.target.classList.contains("js-delete-comment")) {
    const commentCard = e.target.closest(".comment-card");
    const commentIndex = commentCard.dataset.index;

    post.comments.splice(commentIndex, 1);
    renderPosts(currentPage);
  }

  if (e.target.classList.contains("add-comment-btn")) {
    const input = postCard.querySelector(".comment-input-js");
    if (!input.value.trim()) return;

    post.comments.unshift({
      username: "Ebram Ayman",
      topic: input.value,
    });

    input.value = "";
    renderPosts();
  }
});

const addPost = () => {
  const postInput = document.querySelector(".post-input-js");

  allPosts.unshift({
    username: "Ebram Ayman",
    topic: postInput.value,
    liked: false,
    comments: [],
  });
  postInput.value = "";
  renderPosts(currentPage);
};
postBtn.addEventListener("click", addPost);

function save() {
  localStorage.setItem("posts", JSON.stringify(allPosts));
}

renderPosts(currentPage);
