let tasks = [];

function create(task) {
	tasks = [task, ...tasks];
	console.log("Services | tasks.js : ", tasks);
}

function read() {
	return tasks;
}

function deleteTask(id) {
	// retourne un tableau avec toutes les taches avec un id différent de celui passé
	tasks = tasks.filter((t) => t.id !== id);
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

export default { create, deleteTask, read, convertCase };
