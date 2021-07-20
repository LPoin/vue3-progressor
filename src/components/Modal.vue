<template>
	<div class="modal_background">
		<div class="modal">
			<div>
				<h3>Modifier une tâche</h3>
				<form @submit.prevent="saveTask">
					<input type="text" v-model="taskToEdit.name" placeholder="Nom de la tâche" />
					<br />
					<textarea cols="30" rows="10" v-model="taskToEdit.description"></textarea>
					<br />
					<select v-model="taskToEdit.temporality">
						<option
							v-for="tempo in temporalityTypes"
							:key="tempo.id"
							:value="tempo.value"
							:selected="tempo.value === taskToEdit.temporality"
						>
							{{ tempo.name }}
						</option>
					</select>
					<br />
					<button class="small" :disabled="!isFormValid">Sauvegarder</button>
					<button class="small" @click="cancel">Annuler</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed } from "vue";

export default {
	name: "Modal",
	props: {
		task: {
			require: true,
		},
	},
	setup(props, context) {
		let taskToEdit = ref({ ...props.task });
		const temporalityTypes = ref([
			{
				id: 1,
				name: "court terme",
				value: "short_term",
			},
			{
				id: 2,
				name: "moyen terme",
				value: "medium_term",
			},
			{
				id: 3,
				name: "long terme",
				value: "long_term",
			},
		]);
		let temporality = ref("");

		function saveTask() {
			const taskUpdated = {
				id: taskToEdit.value.id,
				name: taskToEdit.value.name,
				description: taskToEdit.value.description,
				temporality: taskToEdit.value.temporality,
			};
			console.log("MODAL || saveTask : ", taskUpdated);
			context.emit("updateTask", taskUpdated);
		}

		function cancel() {
			context.emit("cancel");
		}

		const isFormValid = computed(() => {
			if (
				taskToEdit.value.name !== "" &&
				taskToEdit.value.description !== "" &&
				taskToEdit.value.temporality !== ""
			) {
				return true;
			} else {
				return false;
			}
		});

		return { temporalityTypes, temporality, taskToEdit, saveTask, cancel, isFormValid };
	},
};
</script>

<style>
.modal_background {
	position: fixed;
	z-index: 999;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	display: table;
	transition: opacity 0.3s ease;
}
.modal {
	border: 4px solid #42b983;
	background-color: #fff;
	padding-bottom: 22px;
	margin: 30px;
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
