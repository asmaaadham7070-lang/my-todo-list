// ====================================================
// 1. تحديد العناصر
// ====================================================
const button = document.querySelector(".button");
const input = document.querySelector(".ee[type='text']");
const taskk = document.querySelector(".taskk");
const clearCompletedBtn = document.getElementById("clear-completed");

const totalTasksEl = document.getElementById("total-tasks");
const completedTasksEl = document.getElementById("completed-tasks");
const pendingTasksEl = document.getElementById("pending-tasks");

// ====================================================
// 2. إدارة البيانات والتخزين في LocalStorage
// ====================================================

let tasksArray = JSON.parse(localStorage.getItem("my_tasks")) || [];

const saveToLocalStorage = () => {
  localStorage.setItem("my_tasks", JSON.stringify(tasksArray));
};

const updateCounters = () => {
  const total = tasksArray.length;
  const completed = tasksArray.filter(task => task.completed).length;
  const pending = total - completed;

  totalTasksEl.textContent = total;
  completedTasksEl.textContent = completed;
  pendingTasksEl.textContent = pending;
};

// ====================================================
// 3. عرض القائمة على الشاشة
// ====================================================
const renderTasks = () => {
  taskk.innerHTML = "";

  tasksArray.forEach((taskObj, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = `task ${taskObj.completed ? "completed" : ""}`;

    // زر علامة الصح للإنجاز
    const checkButton = document.createElement("button");
    checkButton.className = "check-btn";
    checkButton.innerHTML = taskObj.completed ? "✓" : "";
    checkButton.title = taskObj.completed ? "Uncheck" : "Mark as completed";
    checkButton.onclick = () => toggleTaskCompleted(index);

    // نص المهمة
    const taskParagraph = document.createElement("p");
    taskParagraph.textContent = taskObj.text;

    // حاوية الأزرار
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "task-actions";

    // زر الحذف
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.onclick = () => deleteTask(index);

    // تجميع العناصر
    actionsDiv.appendChild(deleteButton);
    taskDiv.appendChild(checkButton);
    taskDiv.appendChild(taskParagraph);
    taskDiv.appendChild(actionsDiv);

    taskk.appendChild(taskDiv);
  });

  updateCounters();
};

// ====================================================
// 4. الدوال التفاعلية
// ====================================================

const addTask = () => {
  const value = input.value.trim();

  if (value === "") return;

  tasksArray.push({ text: value, completed: false });
  saveToLocalStorage();
  renderTasks();

  input.value = "";
  input.focus();
};

const toggleTaskCompleted = (index) => {
  tasksArray[index].completed = !tasksArray[index].completed;
  saveToLocalStorage();
  renderTasks();
};

const deleteTask = (index) => {
  tasksArray.splice(index, 1);
  saveToLocalStorage();
  renderTasks();
};

const clearCompletedTasks = () => {
  tasksArray = tasksArray.filter(task => !task.completed);
  saveToLocalStorage();
  renderTasks();
};

// ====================================================
// 5. الأحداث
// ====================================================
button.onclick = addTask;
clearCompletedBtn.onclick = clearCompletedTasks;

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// التشغيل الأولي
renderTasks();