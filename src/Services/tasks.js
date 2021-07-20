let tasks = [];
const storageKey = "task-vue-compo-api";

function create(task) {
	tasks = [task, ...tasks];
	console.log("Services | tasks.js : ", tasks);
	save();
}

function read() {
	tasks = load();
	return tasks;
}

function deleteTask(id) {
	// retourne un tableau avec toutes les taches avec un id différent de celui passé
	tasks = tasks.filter((t) => t.id !== id);
	save();
}

function convertCase(temporalityKebabCase) {
	let result;
	switch (temporalityKebabCase) {
		case "short_term":
			result = "court terme";
			break;
		case "medium_term":
			result = "moyen terme";
			break;
		case "long_term":
			result = "long terme";
			break;

		default:
			result = "temporalité";
			break;
	}
	return result;
}

function save() {
	localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function load() {
	const fromLocalStorage = localStorage.getItem(storageKey);
	return JSON.parse(fromLocalStorage);
}

function updateTask(task) {
	const index = tasks.findIndex((t) => t.id === task.id);
	if (index === -1) {
		return;
	} else {
		tasks[index] = task;
		console.log("TASKS.JS || updateTask ok");
		save();
	}
}

export default { create, deleteTask, read, convertCase, updateTask };
