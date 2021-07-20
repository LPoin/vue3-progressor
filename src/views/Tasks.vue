<template>
	<Modal
		v-if="isEditMode"
		:task="taskToEdit"
		@updateTask="updateTask($event)"
		@cancel="cancelEdit"
	/>
	<div>
		<h3>Tâches en cours</h3>

		<input type="text" placeholder="filtrer" v-model="letters" @keyup="filter" />
		<div class="radioFilters">
			<label for="all">
				<input type="radio" name="all" id="all" value="" v-model="selectedTemporality" />
				Toutes
			</label>
			<label for="short_term">
				<input
					type="radio"
					name="short_term"
					id="short_term"
					value="short_term"
					v-model="selectedTemporality"
				/>
				Court terme
			</label>
			<label for="medium_term">
				<input
					type="radio"
					name="medium_term"
					id="medium_term"
					value="medium_term"
					v-model="selectedTemporality"
				/>
				Moyen terme
			</label>
			<label for="long_term">
				<input
					type="radio"
					name="long_term"
					id="long_term"
					value="long_term"
					v-model="selectedTemporality"
				/>
				Long terme
			</label>
		</div>
		<div v-if="tasksFiltered.length > 0">
			<div class="task" v-for="task in tasksFiltered" :key="task.id">
				<h3>{{ task.name }}</h3>
				<p>{{ task.description }}</p>
				<h4>Echéance : {{ convertCase(task.temporality) }}</h4>
				<div>
					<button class="small" @click="() => toggle(task)">modif</button>
					<button class="small" @click="() => deleteTask(task.id)">suppr</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import tasksService from "@/Services/tasks.js";
import { ref, watch } from "vue";
import Modal from "../components/Modal.vue";

export default {
	name: "Tasks",
	components: {
		Modal,
	},
	setup() {
		const letters = ref("");
		const selectedTemporality = ref("");
		const tasks = ref([]);
		tasks.value = tasksService.read();
		let tasksFiltered = ref([]);
		let taskToEdit = ref(null);
		let isEditMode = ref(false);

		// On filtre au début pour afficher toutes les taches
		filter();

		function convertCase(temporality) {
			return tasksService.convertCase(temporality);
		}

		function filter() {
			if (letters.value.length === 0) {
				tasksFiltered.value = tasks.value;
			} else {
				tasksFiltered.value = tasks.value.filter((tache) =>
					tache.name.toLocaleLowerCase().includes(letters.value.toLocaleLowerCase())
				);
			}

			if (selectedTemporality.value !== "") {
				tasksFiltered.value = tasksFiltered.value.filter(
					(t) => t.temporality === selectedTemporality.value
				);
				console.log("taskFiltered : ", tasksFiltered.value);
				console.log("selectedTemporality : ", selectedTemporality.value);
			}
		}

		function toggle(task) {
			taskToEdit.value = task;
			isEditMode.value = true;
		}

		function updateTask(task) {
			tasksService.updateTask(task);
			tasks.value = tasksService.read();
			filter();
			cancelEdit();
		}

		function cancelEdit() {
			isEditMode.value = false;
			taskToEdit.value = null;
		}

		function deleteTask(id) {
			tasksService.deleteTask(id);
			tasks.value = tasksService.read();
			filter();
		}

		watch(selectedTemporality, (newValue, oldValue) => {
			console.log("nouvelle valeur : ", newValue, " || Ancienne Valeur : ", oldValue);
			if (newValue !== "") {
				filter();
			} else {
				tasksFiltered.value = tasks.value;
				filter();
			}
		});

		return {
			cancelEdit,
			convertCase,
			deleteTask,
			filter,
			isEditMode,
			letters,
			selectedTemporality,
			tasks,
			tasksFiltered,
			taskToEdit,
			toggle,
			updateTask,
		};
	},
};
</script>

<style scoped>
.task {
	margin: 10px 15px;
	border: 3px solid #42b983;
	border-radius: 5px;
}

.radioFilters {
	display: flex;
	justify-content: center;
}

.small {
	background-color: #42b983;
	border: none;
	color: white;
	padding: 5px 10px;
	margin: 10px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
}
</style>
