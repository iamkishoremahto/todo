
function applyCheckbox(label) {
  checkbox = label.querySelector('input[type="checkbox"]')
  if (checkbox.checked) {
    label.classList.add('checkbox_icon_checked');
  } else {
    label.classList.remove('checkbox_icon_checked');
  }
}


function todoStyleHandler() {
  var labels = document.querySelectorAll('li .checkbox_icon ');

  labels.forEach((label) => {

    applyCheckbox(label)

    label.addEventListener('click', () => {
      applyCheckbox(label)
    })
  })
}


function showTodoList() {
  let filter = document.querySelector('.filter label input[type="radio"]:checked').id;

  let all_todo = document.querySelector('.all_todos');
  all_todo.innerHTML = ``;
  var todoData = JSON.parse(localStorage.getItem('todo_data'));


  Object.entries(todoData).reverse().forEach(([value, status]) => {
    if (filter === 'all') {
      createNewTodoListItem(value, status)
    }
    else if (filter === 'active') {
      if (!status) {
        createNewTodoListItem(value, status)
      }
    }
    else if (filter === 'completed') {
      if (status) {
        createNewTodoListItem(value, status)
      }
    }


  })

  let themeButton = document.querySelector('.theme_image');
  if (themeButton.classList.contains('changeThemeImage')) {
    let allTodo = document.querySelectorAll('.all_todos li span')
    allTodo.forEach((todo) => {
      todo.classList.add('todoListColor')
    })
  }

  todoStyleHandler();
  updateLeftTodoCount();

}


function saveTodoDataObject(todoData) {
  localStorage.setItem('todo_data', JSON.stringify(todoData));
}

function updateTodoDataObject(value, status) {
  var todoData = JSON.parse(localStorage.getItem('todo_data'));
  todoData[value] = status;
  saveTodoDataObject(todoData)
  showTodoList()
}

function removeTodo(value) {
  var todoData = JSON.parse(localStorage.getItem('todo_data'));
  delete todoData[value];
  saveTodoDataObject(todoData)
  showTodoList()
}

function createNewTodoListItem(value, status) {
  let all_todo = document.querySelector('.all_todos');


  if (status) {
    var htmlTemplate = `<label class="checkbox_icon "><input type="checkbox" name="todo" checked><span>${value}</span></label><span class="close"><img src="/images/icon-cross.svg" alt="close"></span>`
  }
  else {

    var htmlTemplate = `<label class="checkbox_icon "><input type="checkbox" name="todo"><span>${value}</span></label><span class="close"><img src="/images/icon-cross.svg" alt="close"></span>`
  }

  let li_element = document.createElement('li');
  li_element.innerHTML = htmlTemplate;

  let closeBtn = li_element.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    let removeValue = li_element.textContent;
    removeTodo(removeValue)
  });
  let checkTodo = li_element.querySelector('input[type="checkbox"]');

  checkTodo.addEventListener('click', () => {
    if (checkTodo.checked) {
      let removeValue = li_element.textContent;
      updateTodoDataObject(removeValue, true)
    }
    else {
      let removeValue = li_element.textContent;
      updateTodoDataObject(removeValue, false)
    }
  })

  all_todo.appendChild(li_element);

}

function saveTodoInput() {
  let todoInput = document.getElementById('new_todo_input')
  todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      let value = event.target.value;

      localStorageObjectHandler(value)
      todoInput.value = '';

    }
  });

}



function addTodoToLocalStorage(value) {
  var todoData = JSON.parse(localStorage.getItem('todo_data'));
  todoData[value] = false;

  saveTodoDataObject(todoData);


}


function localStorageObjectHandler(value) {
  var todoData = localStorage.getItem('todo_data');
  if (todoData === null) {
    let data = {
      "Complete Todo App on frontend mentor":false,
      "Pick up groceries":false,
      "Read for 1 hour":false,
      "10 minutes meditation":false,
      "Jog around the park 3x":false,
      "Complete online JavaScript course":true,
    }
    localStorage.setItem('todo_data', JSON.stringify(data));
  }
  else {
    addTodoToLocalStorage(value)
    showTodoList()
  }
}

function updateLeftTodoCount() {
  var todoData = JSON.parse(localStorage.getItem('todo_data'));

  let count = 0;
  Object.entries(todoData).reverse().forEach(([value, status]) =>{
    if (!status){
      count ++;
    }
  })


  let countElement = document.querySelector('.count')
  countElement.textContent = count;

}

function filterHandler() {
  let all_filter = document.querySelectorAll('.filter label');
  all_filter.forEach((item) => {
    item.addEventListener('click', () => {
      let radioButton = item.querySelector('input[type="radio"]')
      radioButton.click();
      showTodoList()
      all_filter.forEach((item2) => {
        item2.style.color = 'hsl(234, 11%, 52%)'
      });
      item.style.color = "hsl(220, 98%, 61%)"
    })
  });
}

function clearCompletedHandler() {

  let clearCompletedButton = document.querySelector('#clear')

  clearCompletedButton.addEventListener('click', () => {
    let allCompletedTodo = document.querySelectorAll('.all_todos label');
    allCompletedTodo.forEach((item) => {
      let checkCompleteStatus = item.querySelector('input[type=checkbox]');
      if (checkCompleteStatus.checked) {
        removeTodo(item.textContent)
      }
    });
  });



}
function changeMobileBackground(){
  var mainBackground = document.querySelector('.main_container');
  var screenWidth = window.innerWidth;
  console.log(screenWidth)
  console.log(mainBackground.classList.contains('veryWhiteColorBackground'))
  if (screenWidth >0 && screenWidth <=756 && mainBackground.classList.contains('veryWhiteColorBackground')){
    mainBackground.classList.add('changeBackgroundInMobileLight')

  }
  else{
    mainBackground.classList.remove('changeBackgroundInMobileLight')
    
  }
}

function themeHandler() {
  var themeButton = document.querySelector('.theme_image');
  themeButton.addEventListener('click', () => {
    
    let mainBackground = document.querySelector('.main_container');
    let showTodo = document.querySelector('.show_created_todo')
    let todoList = document.querySelectorAll('.all_todos li span');
    let create_new_todo = document.querySelector('.create_new_todo');
    let filter = document.querySelector('.filter')

    themeButton.classList.toggle('changeThemeImage');
    mainBackground.classList.toggle('veryWhiteColorBackground')
    showTodo.classList.toggle('VeryLightGrayishBlue')
    create_new_todo.classList.toggle('create_new_todo_light')
    filter.classList.toggle('filter_mobile');
    todoList.forEach((item) => {
      item.classList.toggle('todoListColor')
    })
    changeMobileBackground();
  });

}



localStorageObjectHandler();
try{
  filterHandler();
  showTodoList();
}
catch(e) {
  console.error(e);
}

saveTodoInput();
themeHandler();
clearCompletedHandler();






