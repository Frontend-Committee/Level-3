const defaultPosts = [
  {
    id: 101,
    text: "Just announced a new feature for my website",
    name: "Elon Musk",
    handle: "@elonmusk",
    avatar: "assets/icons/avatar.png",
    likes: 5000,
    reposts: 1200,
    comments: [],
    views: 100000,
    time: "1h",
  },
  {
    id: 102,
    text: "Hi everyone! Excited to join this platform.",
    name: "Mariam Yasser",
    handle: "@mariamyass71202",
    avatar: "assets/icons/avatar.png",
    likes: 120,
    reposts: 15,
    comments: [],
    views: 1500,
    time: "2h",
  },
  {
    id: 103,
    text: "JavaScript is the best language ever. Change my mind.",
    name: "Dev Community",
    handle: "@dev_community",
    avatar: "assets/icons/avatar.png",
    likes: 890,
    reposts: 200,
    comments: [],
    views: 12000,
    time: "3h",
  },
  {
    id: 104,
    text: "Hello",
    name: "ahmed ahmed",
    handle: "@ahmedahmed",
    avatar: "assets/icons/avatar.png",
    likes: 20,
    reposts: 0,
    comments: [],
    views: 100,
    time: "5h",
  },
];

const followingPosts = [
  {
    id: 201,
    text: "Working on a new  project ",
    name: "Ahmed Ali",
    handle: "@ahmed_dev",
    avatar: "assets/icons/avatar.png",
    likes: 45,
    reposts: 2,
    comments: [],
    views: 300,
    time: "30m",
  },
  {
    id: 202,
    text: "Good morning everyone!",
    name: "Sarah Smith",
    handle: "@sarah_life",
    avatar: "assets/icons/avatar.png",
    likes: 20,
    reposts: 0,
    comments: [],
    views: 100,
    time: "1h",
  },
];

const trendingData = [
  {
    category: "Trending in Egypt",
    title: "#الأهلي_خط_أحمر",
    stats: "120K posts",
  },
  {
    category: "Politics · Trending",
    title: "#Election2025",
    stats: "500K posts",
  },
  { category: "Music · Trending", title: "Amr Diab", stats: "50K posts" },
  {
    category: "Trending in Egypt",
    title: "#الثانوية_العامة",
    stats: "2.5M posts",
  },
];

const newsData = [
  {
    category: "World News",
    title: "Earthquake hits Japan with magnitude 7.2",
    stats: "Live coverage",
  },
  {
    category: "Technology",
    title: "OpenAI announces GPT-6 model",
    stats: "2 hours ago",
  },
  {
    category: "Sports",
    title: "Liverpool wins the Premier League",
    stats: "10K posts",
  },
];

let forYouPosts = JSON.parse(localStorage.getItem("myPosts")) || defaultPosts;
forYouPosts = forYouPosts.map((post) => {
  if (!post.id) {
    return { ...post, id: Date.now() + Math.random() };
  }
  return post;
});

let deletedPostData = null;
let deletedPostIndex = null;
let undoTimeout = null;
let postToDeleteNode = null;

const postInput = document.querySelector(".tweetInput");
const postBtn = document.querySelector(".postBtn");
const postsGrid = document.getElementById("postsGrid");
const feedTabs = document.querySelectorAll(".feedHeader button");
const createPostContainer = document.querySelector(".createPost");
const themeBtn = document.getElementById("themeBtn");
const followBtns = document.querySelectorAll(".followBtn");

const undoToast = document.createElement("div");
undoToast.className = "undoToast";
undoToast.innerHTML = `
  <span>Post deleted.</span>
  <button class="undoBtn">Undo</button>
`;
document.body.appendChild(undoToast);
const undoActionBtn = undoToast.querySelector(".undoBtn");

const rootElement = document.documentElement;
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  rootElement.setAttribute("data-theme", currentTheme);
}

function renderFeed(postsArray) {
  postsGrid.innerHTML = "";
  postsArray.forEach((post) => {
    createPost(post.text, post);
  });
}

function renderList(itemsArray) {
  postsGrid.innerHTML = "";
  itemsArray.forEach((item) => {
    const div = document.createElement("div");
    div.className = "feedListItem";
    div.innerHTML = `
      <div class="feedListContent">
        <span class="feedListCategory">${item.category}</span>
        <div class="feedListTitle">${item.title}</div>
        <span class="feedListStats">${item.stats}</span>
      </div>
      <div class="feedListMore">...</div>
    `;
    postsGrid.appendChild(div);
  });
}

function updatePostInStorage(updatedPost) {
  const index = forYouPosts.findIndex((p) => p.id === updatedPost.id);
  if (index > -1) {
    forYouPosts[index] = updatedPost;
    localStorage.setItem("myPosts", JSON.stringify(forYouPosts));
  }
}

function createPost(content, user = null) {
  const defaults = {
    id: Date.now(),
    name: "mariam yasser",
    handle: "@mariamyass71202",
    avatar: "assets/images/ana.png",
    likes: 0,
    reposts: 0,
    comments: [],
    views: 0,
    time: "now",
    isLiked: false,
    isReposted: false,
    isSaved: false,
  };

  let postData = { ...defaults, ...user };

  const postCard = document.createElement("article");
  postCard.className = "postCard";

  const commentsCount = postData.comments.length;

  const postHTML = `
    <div class="postLeft">
        <img src="${postData.avatar}" class="avatar" alt="User Avatar">
    </div>
    <div class="postRight">
        <div class="postHeader">
            <div class="postInfo">
                <span class="username">${postData.name}</span>
                <span class="handle">${postData.handle}</span>
                <span class="dot">·</span>
                <span class="time">${postData.time}</span>
            </div>
            
            <div style="position: relative;">
                <button class="postOptions">
                    <img src="assets/icons/dots.png" alt="options">
                </button>
                <div class="deleteMenu">
                    <button class="deletePostBtn">
                       🗑 Delete
                    </button>
                </div>
            </div>
        </div>
        
        <p class="postText">${content}</p>
        
        <div class="postFooter">
            <button class="actionBtn comment">
                <img src="assets/icons/comment.png" class="iconContainer" alt="Comment">
                <span class="count">${commentsCount}</span>
            </button>
            
            <button class="actionBtn repost ${
              postData.isReposted ? "active" : ""
            }">
                <img src="assets/icons/repost.png" class="iconContainer" alt="Repost">
                <span class="count">${postData.reposts}</span>
            </button>
            
            <button class="actionBtn like ${postData.isLiked ? "active" : ""}">
                <img src="assets/icons/like.png" class="iconContainer" alt="Like">
                <span class="count">${postData.likes}</span>
            </button>
            
            <button class="actionBtn view">
                <img src="assets/icons/view.png" class="iconContainer" alt="View">
                <span class="count">${postData.views}</span>
            </button>
            
             <div style="display: flex; gap: 0.5em;" class="rightActions">
                <button class="actionBtn save ${
                  postData.isSaved ? "active" : ""
                }">
                   <img src="assets/icons/save.png" class="iconContainer" alt="Bookmark">
                </button>
                <button class="actionBtn share">
                   <img src="assets/icons/share.png" class="iconContainer" alt="Share">
                </button>
            </div>
        </div>

        <div class="commentSection">
            <div class="commentInputArea">
                <input type="text" class="commentInput" placeholder="Post your reply">
                <button class="sendCommentBtn">Reply</button>
            </div>
            <div class="commentsList"></div>
        </div>
    </div>
  `;

  postCard.innerHTML = postHTML;

  const optionsBtn = postCard.querySelector(".postOptions");
  const deleteMenu = postCard.querySelector(".deleteMenu");
  const deleteBtn = postCard.querySelector(".deletePostBtn");

  optionsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".deleteMenu").forEach((menu) => {
      if (menu !== deleteMenu) menu.classList.remove("show");
    });
    deleteMenu.classList.toggle("show");
  });

  deleteBtn.addEventListener("click", () => {
    deleteMenu.classList.remove("show");
    deletedPostIndex = forYouPosts.findIndex((p) => p.id === postData.id);
    if (deletedPostIndex > -1) {
      deletedPostData = forYouPosts[deletedPostIndex];
      forYouPosts.splice(deletedPostIndex, 1);
      localStorage.setItem("myPosts", JSON.stringify(forYouPosts));
    }
    postCard.style.display = "none";
    undoToast.classList.add("show");
    postToDeleteNode = postCard;
    if (undoTimeout) clearTimeout(undoTimeout);
    undoTimeout = setTimeout(() => {
      postCard.remove();
      deletedPostData = null;
      deletedPostIndex = null;
      postToDeleteNode = null;
      undoToast.classList.remove("show");
    }, 5000);
  });

  const saveBtn = postCard.querySelector(".actionBtn.save");
  saveBtn.addEventListener("click", () => {
    postData.isSaved = !postData.isSaved;
    saveBtn.classList.toggle("active", postData.isSaved);

    const index = forYouPosts.findIndex((p) => p.id === postData.id);
    if (index > -1) {
      forYouPosts[index].isSaved = postData.isSaved;
      localStorage.setItem("myPosts", JSON.stringify(forYouPosts));
    }
  });

  const likeBtn = postCard.querySelector(".actionBtn.like");
  const likeCountSpan = likeBtn.querySelector(".count");

  likeBtn.addEventListener("click", () => {
    postData.isLiked = !postData.isLiked;
    let count = parseInt(likeCountSpan.textContent);
    if (postData.isLiked) {
      count++;
      likeBtn.classList.add("active");
    } else {
      count--;
      likeBtn.classList.remove("active");
    }

    postData.likes = count;
    likeCountSpan.textContent = count;

    updatePostInStorage(postData);
  });

  const repostBtn = postCard.querySelector(".actionBtn.repost");
  const repostCountSpan = repostBtn.querySelector(".count");

  repostBtn.addEventListener("click", () => {
    postData.isReposted = !postData.isReposted;

    let count = parseInt(repostCountSpan.textContent);
    if (postData.isReposted) {
      count++;
      repostBtn.classList.add("active");
    } else {
      count--;
      repostBtn.classList.remove("active");
    }

    postData.reposts = count;
    repostCountSpan.textContent = count;

    updatePostInStorage(postData);
  });

  const commentBtn = postCard.querySelector(".actionBtn.comment");
  const commentCountSpan = commentBtn.querySelector(".count");
  const commentSection = postCard.querySelector(".commentSection");
  const commentInput = postCard.querySelector(".commentInput");
  const sendCommentBtn = postCard.querySelector(".sendCommentBtn");
  const commentsList = postCard.querySelector(".commentsList");

  function renderSingleComment(comment) {
    const commentDiv = document.createElement("div");
    commentDiv.className = "singleComment";

    commentDiv.innerHTML = `
      <img src="${comment.user.avatar}" class="commentAvatar" alt="avatar">
      <div class="commentContent">
          
          <div class="commentHeader">
              <div class="commentInfo">
                  <span class="commentUser">${comment.user.name}</span>
                  <span class="commentHandle">${comment.user.handle}</span>
              </div>

              <div style="position: relative;">
                  <button class="commentOptionsBtn">
                      <img src="assets/icons/dots.png" alt="options">
                  </button>
                  <div class="deleteMenu"> <button class="deleteCommentBtn">
                          🗑 Delete
                      </button>
                  </div>
              </div>
          </div>

          <div class="commentText">${comment.text}</div>
          
          <div class="commentActions">
              <button class="commentActionBtn likeCommentBtn ${
                comment.isLiked ? "liked" : ""
              }">
                  ${comment.isLiked ? "❤️" : "🤍"} Like
              </button>
              <button class="commentActionBtn replyCommentBtn">
                  💬 Reply
              </button>
          </div>
      </div>
    `;

    const optionsBtn = commentDiv.querySelector(".commentOptionsBtn");
    const deleteMenu = commentDiv.querySelector(".deleteMenu");

    optionsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".deleteMenu").forEach((menu) => {
        if (menu !== deleteMenu) menu.classList.remove("show");
      });
      deleteMenu.classList.toggle("show");
    });

    const deleteBtn = commentDiv.querySelector(".deleteCommentBtn");
    deleteBtn.addEventListener("click", () => {
      postData.comments = postData.comments.filter((c) => c.id !== comment.id);
      commentDiv.remove();
      commentCountSpan.textContent = postData.comments.length;

      updatePostInStorage(postData);
    });

    const likeCommentBtn = commentDiv.querySelector(".likeCommentBtn");
    likeCommentBtn.addEventListener("click", () => {
      comment.isLiked = !comment.isLiked;
      likeCommentBtn.innerHTML = comment.isLiked ? "❤️ Like" : "🤍 Like";
      likeCommentBtn.classList.toggle("liked", comment.isLiked);
      updatePostInStorage(postData);
    });

    const replyCommentBtn = commentDiv.querySelector(".replyCommentBtn");
    replyCommentBtn.addEventListener("click", () => {
      commentInput.value = `@${comment.user.name.split(" ")[0]} `;
      commentInput.focus();
    });

    commentsList.appendChild(commentDiv);
  }

  if (postData.comments.length > 0) {
    postData.comments.forEach((comment) => renderSingleComment(comment));
  }

  commentBtn.addEventListener("click", () => {
    if (
      commentSection.style.display === "none" ||
      commentSection.style.display === ""
    ) {
      commentSection.style.display = "block";
      commentInput.focus();
    } else {
      commentSection.style.display = "none";
    }
  });

  sendCommentBtn.addEventListener("click", () => {
    const commentText = commentInput.value.trim();
    if (commentText !== "") {
      const newComment = {
        id: Date.now() + Math.random(),
        text: commentText,
        user: {
          name: "Mariam Yasser",
          handle: "@mariamyass71202",
          avatar: "assets/images/ana.png",
        },
        isLiked: false,
      };

      postData.comments.push(newComment);
      renderSingleComment(newComment);

      commentCountSpan.textContent = postData.comments.length;
      commentInput.value = "";

      updatePostInStorage(postData);
    }
  });

  postsGrid.prepend(postCard);
}

if (postInput && postBtn) {
  postBtn.disabled = true;

  postInput.addEventListener("input", () => {
    if (postInput.value.trim() !== "") {
      postBtn.disabled = false;
    } else {
      postBtn.disabled = true;
    }
  });

  postBtn.addEventListener("click", () => {
    const content = postInput.value.trim();
    if (content !== "") {
      const newPost = {
        id: Date.now(),
        text: content,
        name: "mariam yasser",
        handle: "@mariamyass71202",
        avatar: "assets/images/ana.png",
        likes: 0,
        reposts: 0,
        comments: [],
        views: 0,
        time: "now",
        isLiked: false,
        isReposted: false,
        isSaved: false,
      };

      forYouPosts.push(newPost);
      localStorage.setItem("myPosts", JSON.stringify(forYouPosts));

      createPost(content, newPost);
      postInput.value = "";
      postBtn.disabled = true;
    }
  });
}

undoActionBtn.addEventListener("click", () => {
  clearTimeout(undoTimeout);

  if (deletedPostData !== null && deletedPostIndex !== null) {
    forYouPosts.splice(deletedPostIndex, 0, deletedPostData);
    localStorage.setItem("myPosts", JSON.stringify(forYouPosts));
    createPost(deletedPostData.text, deletedPostData);
  }

  deletedPostData = null;
  deletedPostIndex = null;
  postToDeleteNode = null;
  undoToast.classList.remove("show");
});

if (themeBtn) {
  themeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const currentTheme = rootElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    rootElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

if (followBtns.length > 0) {
  followBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("following");
      if (btn.classList.contains("following")) {
        btn.textContent = "Following";
      } else {
        btn.textContent = "Follow";
      }
    });
  });
}
const forYouContent = document.getElementById("forYouContent");

if (feedTabs.length > 0) {
  feedTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelector(".feedHeader .active").classList.remove("active");
      tab.classList.add("active");

      if (tab.classList.contains("forYouSec")) {
        renderFeed(forYouPosts);
        if (forYouContent) forYouContent.style.display = "block";
      } else {
        if (forYouContent) forYouContent.style.display = "none";

        if (tab.classList.contains("trendingSec")) {
          renderList(trendingData);
        } else if (tab.classList.contains("newsSec")) {
          renderList(newsData);
        } else if (tab.classList.contains("followingSec")) {
          renderFeed(followingPosts);
        } else {
          postsGrid.innerHTML =
            "<div style='padding:2em; text-align:center; color:var(--text-secondary)'>Nothing to see here yet</div>";
        }
      }
    });
  });
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".postOptions")) {
    document.querySelectorAll(".deleteMenu").forEach((menu) => {
      menu.classList.remove("show");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderFeed(forYouPosts);
});

const notificationData = {
  all: `
    <div class="emptyState">
        <h2>Nothing to see here — yet</h2>
        <p>From likes to reposts and a whole lot more, this is where all the action happens.</p>
    </div>
  `,

  verified: `
    <div class="emptyState">
    <img src="assets/images/verification.png" alt="Verified Empty" class="emptyImage">
        <h2>Nothing to see here — yet</h2>
        <p>Likes, mentions, reposts, and a whole lot more — when it comes from a verified account, you’ll find it here. <a href="#" class="learn">Learn more</a></p>
    </div>
  `,

  mentions: `
    <div class="emptyState">
        <h2>Nothing to see here — yet</h2>
        <p>When someone mentions you, you’ll find it here.</p>
    </div>
  `,
};

const notifContainer = document.getElementById("notificationFeed");
const notifTabs = document.querySelectorAll(
  ".allSec, .VerifiedSec, .mentionSec"
);

function renderNotifications(type) {
  if (notifContainer && notificationData[type]) {
    notifContainer.innerHTML = notificationData[type];
  }
}

if (notifTabs.length > 0) {
  notifTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const currentActive = tab.parentElement.querySelector(".active");
      if (currentActive) currentActive.classList.remove("active");

      tab.classList.add("active");

      if (tab.classList.contains("allSec")) {
        renderNotifications("all");
      } else if (tab.classList.contains("VerifiedSec")) {
        renderNotifications("verified");
      } else if (tab.classList.contains("mentionSec")) {
        renderNotifications("mentions");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (notifContainer) {
    renderNotifications("all");
  }
});

const moreBtn = document.getElementById("moreBtn");
const moreDropdown = document.getElementById("moreDropdown");

moreBtn.addEventListener("click", function (e) {
  e.preventDefault();
  moreDropdown.classList.toggle("show-dropdown");
});

window.addEventListener("click", function (e) {
  if (!moreBtn.contains(e.target)) {
    moreDropdown.classList.remove("show-dropdown");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const isBookmarksPage = window.location.pathname.includes("bookmarks.html");

  if (isBookmarksPage) {
    const allPosts =
      JSON.parse(localStorage.getItem("myPosts")) || defaultPosts;
    const savedPosts = allPosts.filter((post) => post.isSaved === true);

    if (savedPosts.length === 0) {
      postsGrid.innerHTML = `
        <div class="topi" >
          <h2 class="savePosts" >Save Posts for later</h2>
          <p class="paPosts">Don’t let the good stuff get away! Save posts to easily find them again in the future.</p>
        </div>`;
    } else {
      renderFeed(savedPosts);
    }
  } else {
    renderFeed(forYouPosts);
  }
});

function goBack() {
  window.history.back();
}
