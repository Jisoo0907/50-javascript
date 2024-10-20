const todoInput = document.querySelector("#todo-input"); // 입력한 할 일 가져오기
const addButton = document.querySelector(".addButton"); // 추가 버튼
const todoList = document.querySelector(".list"); // ul 요소

/* 새 할 일 생성하기 */
addButton.addEventListener("click", () => {
  const newTodo = document.createElement("span");
  const checkBox = document.createElement("input"); // checkbox
  const removeButton = document.createElement("button"); // 삭제 버튼
  const newTodoList = document.createElement("li"); // 입력한 할 일을 추가할 li 요소
  // 버튼 클릭 시 추가하는 로직

  newTodo.className = "new-todo";
  checkBox.type = "checkBox";
  newTodo.innerText = todoInput.value;
  removeButton.className = "remove-button";
  removeButton.innerText = "삭제";

  newTodoList.appendChild(checkBox);
  newTodoList.appendChild(newTodo);
  newTodoList.appendChild(removeButton);
  todoList.appendChild(newTodoList);
  // 항목 여러개 추가가 안됨 이슈
  todoInput.value = ""; // 리스트에 추가 후 input 비우기

  // 할 일 삭제하기
  removeButton.addEventListener("click", () => {
    todoList.removeChild(newTodoList);
  });

  // 체크박스 체크 시 할 일 완료 됐다는 표시 되도록 (각 할 일 항목에 클릭 이벤트)
  todoList.addEventListener("click", () => {
    if (checkBox.checked) {
      newTodo.classList.add("checked");
    } else {
      newTodo.classList.remove("checked");
    }
  });
});
