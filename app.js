const shrink_btn = document.querySelector(".shrink-btn");
const search = document.querySelector(".search");
const sidebar_links = document.querySelectorAll(".sidebar-links a");
const active_tab = document.querySelector(".active-tab");
const shortcuts = document.querySelector(".sidebar-links h4");
const tooltip_elements = document.querySelectorAll(".tooltip-element");

let activeIndex;

shrink_btn.addEventListener("click", () => {
  document.body.classList.toggle("shrink");
  setTimeout(moveActiveTab, 400);

  shrink_btn.classList.add("hovered");

  setTimeout(() => {
    shrink_btn.classList.remove("hovered");
  }, 500);
});

search.addEventListener("click", () => {
  document.body.classList.remove("shrink");
  search.lastElementChild.focus();
});

function moveActiveTab() {
  let topPosition = activeIndex * 58 + 2.5;

  if (activeIndex > 3) {
    topPosition += shortcuts.clientHeight;
  }

  active_tab.style.top = `${topPosition}px`;
}

function changeLink() {
  sidebar_links.forEach((sideLink) => sideLink.classList.remove("active"));
  this.classList.add("active");

  activeIndex = this.dataset.active;

  moveActiveTab();
}

sidebar_links.forEach((link) => link.addEventListener("click", changeLink));

function showTooltip() {
  let tooltip = this.parentNode.lastElementChild;
  let spans = tooltip.children;
  let tooltipIndex = this.dataset.tooltip;

  Array.from(spans).forEach((sp) => sp.classList.remove("show"));
  spans[tooltipIndex].classList.add("show");

  tooltip.style.top = `${(100 / (spans.length * 2)) * (tooltipIndex * 2 + 1)}%`;
}

tooltip_elements.forEach((elem) => {
  elem.addEventListener("mouseover", showTooltip);
});


function lovePost(id) {
  let heart = document.getElementById("heart-image-"+id)
  if(heart.src.indexOf("active") === -1) {
    heart.src = "img/heart-active.png"
  } else {
    heart.src = "img/heart.png"
  }
}
function deletePost(id) {
  let elementId = "article-container-"+id
  let element = document.getElementById(elementId)
  element.remove()
 }
function checkCharacterCount(textArea) {
  let counter = document.getElementById("input-characters")
  let container = document.getElementById("form-container")
  
  if (textArea.value.length > 140) {
    textArea.value = textArea.value.substr(0, 140)
    container.classList.add("is-error")
  } else {
    container.classList.remove("is-error")
  }
  counter.innerText = textArea.value.length
}
function submitPost() {
  let textArea = document.getElementById("input-textarea")
  let counter = document.getElementById("input-characters")
  let contentToPost = textArea.value;
  
  if(contentToPost.length === 0) {
    return false;
  }
  
  textArea.value = "";
  counter.innerText = 0;
  
  createPostHTML(contentToPost)
  return false;
}
let currentPostId = 1;
function createPostHTML(postContent) {
  let now = new Date()
  let time = now.toLocaleTimeString()
  let date = now.toLocaleString()
  let name = "Rin Sun"
  let username = "rintfd@163.com"
  
  currentPostId = currentPostId + 1
  
  postContent = postContent.replace(/</g, "&lt;")
  postContent = postContent.replace(/\n/g, "<br />")
  postContent = postContent.replace(/(https?:\/\/[^\s]+)/g, "<a href=\"$1\" target=\"_blank\">$1</a>")
  
  let template = `
    <article id="article-container-${currentPostId}">
      <header>
        <button class="close" onclick="deletePost(${currentPostId})">
          <img src="img/close.png" height="15" width="19"/>
        </button>
        <div class="avatar">
        <img src="img/logo.png" height="40" width="40"/>
        </div>
        <h1>${name}</h1>
        <h2>@${username}</h2>
      </header>
      <blockquote>
        ${postContent}
      </blockquote>
      <hr/>
      <footer>
        <p class="date-posted">Posted
          <time>${date}</time>
        </p>
        <button class="heart" onclick="lovePost(${currentPostId})">
          <img src="img/heart.png" id="heart-image-${currentPostId}" height="19" width="23"/>
        </button>
      </footer>
    </article>`
  document.getElementById("form-container").insertAdjacentHTML("afterend", template)
}
