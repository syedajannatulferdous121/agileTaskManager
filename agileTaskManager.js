class Task {
  constructor(id, title, description, assignee, dueDate, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.assignee = assignee;
    this.dueDate = dueDate;
    this.status = status;
  }
}

class AgileTaskManager {
  constructor() {
    this.tasks = [];
  }

  createTask(id, title, description, assignee, dueDate, status) {
    const task = new Task(id, title, description, assignee, dueDate, status);
    this.tasks.push(task);
  }

  updateTaskStatus(id, status) {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      task.status = status;
    }
  }

  getTasksByStatus(status) {
    return this.tasks.filter(task => task.status === status);
  }

  getTasksByAssignee(assignee) {
    return this.tasks.filter(task => task.assignee === assignee);
  }

  getOverdueTasks() {
    const today = new Date();
    return this.tasks.filter(task => task.dueDate < today && task.status !== 'Done');
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  getAllTasks() {
    return this.tasks;
  }
}

// Example usage with user input:
const taskManager = new AgileTaskManager();

while (true) {
  const userInput = prompt('Enter a command (create, update, status, assignee, overdue, delete, all, exit):');

  if (userInput === 'exit') {
    break;
  }

  switch (userInput) {
    case 'create':
      const taskId = prompt('Enter task ID:');
      const taskTitle = prompt('Enter task title:');
      const taskDescription = prompt('Enter task description:');
      const taskAssignee = prompt('Enter task assignee:');
      const taskDueDate = prompt('Enter task due date:');
      const taskStatus = prompt('Enter task status:');

      taskManager.createTask(taskId, taskTitle, taskDescription, taskAssignee, taskDueDate, taskStatus);
      console.log('Task created successfully!');
      break;

    case 'update':
      const taskIdToUpdate = prompt('Enter task ID to update:');
      const newTaskStatus = prompt('Enter new task status:');

      taskManager.updateTaskStatus(taskIdToUpdate, newTaskStatus);
      console.log('Task status updated successfully!');
      break;

    case 'status':
      const statusFilter = prompt('Enter task status to filter:');
      const tasksByStatus = taskManager.getTasksByStatus(statusFilter);
      console.log('Tasks with status', statusFilter + ':', tasksByStatus);
      break;

    case 'assignee':
      const assigneeFilter = prompt('Enter task assignee to filter:');
      const tasksByAssignee = taskManager.getTasksByAssignee(assigneeFilter);
      console.log('Tasks assigned to', assigneeFilter + ':', tasksByAssignee);
      break;

    case 'overdue':
      const overdueTasks = taskManager.getOverdueTasks();
      console.log('Overdue tasks:', overdueTasks);
      break;

    case 'delete':
      const taskIdToDelete = prompt('Enter task ID to delete:');

      taskManager.deleteTask(taskIdToDelete);
      console.log('Task deleted successfully!');
      break;

    case 'all':
      const allTasks = taskManager.getAllTasks();
      console.log('All Tasks:', allTasks);
      break;

    default:
      console.log('Invalid command. Please try again.');
  }
}
