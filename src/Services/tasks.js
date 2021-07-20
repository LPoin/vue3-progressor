let tasks = [];
const storageKey = "task-vue-compo-api";

function create(task) {
	if (tasks === null) {
		tasks = [];
	}
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

export default { create, deleteTask, read, convertCase };
