const formEl = document.querySelector(".form");
const inpEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");



let list = JSON.parse(localStorage.getItem("list"));

if (!Array.isArray(list)) {
    list = [];
}

list.forEach(task => {
    todolist(task);
});


formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    todolist();
})


function todolist(task) {
    let newEl = inpEl.value;
    if (task) {
        newEl = task.name;
    };
    const liEl = document.createElement("li");

    if (task && task.checked) {
        liEl.classList.add("checked");
    };

    const textSpan = document.createElement("span");
    textSpan.classList.add("task-text");
    textSpan.innerText = newEl;
    liEl.appendChild(textSpan);
    ulEl.appendChild(liEl);
    inpEl.value = "";

    const checkEl = document.createElement("div");
    checkEl.innerHTML = `<i class="fa-solid fa-square-check"></i>`;
    liEl.appendChild(checkEl);


    const trashEl = document.createElement("div");
    trashEl.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    liEl.appendChild(trashEl);

    checkEl.addEventListener("click", () => {
        liEl.classList.toggle("checked");
        updateLocalStorage();

    })
    trashEl.addEventListener("click", () => {
        liEl.remove();
        updateLocalStorage();
    })
    updateLocalStorage();

}

function updateLocalStorage() {
    const liEls = document.querySelectorAll("li");
    list = [];
    liEls.forEach(liEl => {
        list.push({
            name: liEl.innerText,
            checked: liEl.classList.contains("checked")
        })
    })
    localStorage.setItem("list", JSON.stringify(list));

}