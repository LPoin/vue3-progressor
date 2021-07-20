<template>
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
					<button class="small" @click="() => deleteTask(task.id)">suppr</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import tasksService from "@/Services/tasks.js";
import { ref, watch } from "vue";

export default {
	name: "Tasks",
	setup() {
		const letters = ref("");
		const selectedTemporality = ref("");
		const tasks = ref([]);
		tasks.value = tasksService.read();
		let tasksFiltered = ref([]);

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
			convertCase,
			deleteTask,
			filter,
			letters,
			selectedTemporality,
			tasks,
			tasksFiltered,
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
	width: 45px;
}
</style>
