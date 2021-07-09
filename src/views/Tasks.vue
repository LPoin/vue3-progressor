<template>
	<div>
		<h3>Tâches en cours</h3>

		<input type="text" placeholder="filtrer" v-model="letters" @keyup="filter" />

		<div v-if="tasksFiltered.length > 0">
			<div class="task" v-for="task in tasksFiltered" :key="task.id">
				<h3>{{ task.name }}</h3>
				<p>{{ task.description }}</p>
				<h4>{{ convertCase(task.temporality) }}</h4>
			</div>
		</div>
	</div>
</template>

<script>
import tasksService from "@/Services/tasks.js";
import { ref } from "vue";

export default {
	name: "Tasks",
	setup() {
		const letters = ref("");
		const tasks = ref([]);
		tasks.value = tasksService.read();
		let tasksFiltered = ref([]);

		filter();

		function convertCase(temporality) {
			return tasksService.convertCase(temporality);
		}

		function filter() {
			if (letters.value.length === 0) {
				tasksFiltered.value = tasks.value;
			} else {
				tasksFiltered.value = tasks.value.filter((t) =>
					t.name.toLocaleLowerCase().includes(letters.value.toLocaleLowerCase())
				);
			}
		}

		return { tasks, convertCase, letters, filter, tasksFiltered };
	},
};
</script>

<style scoped>
.task {
	margin: 10px 15px;
	border: 3px solid #42b983;
	border-radius: 5px;
}
</style>
