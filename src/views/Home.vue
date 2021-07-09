<template>
	<div class="home">
		<HelloWorld msg="Progressor (compo API)" />
		<Form @createTask="addTask" />
	</div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import Form from "@/components/Form.vue";
import tasksService from "@/Services/tasks.js";

export default {
	name: "Home",
	components: {
		HelloWorld,
		Form,
	},
	setup() {
		function addTask(data) {
			tasksService.create(data);
			console.log("Home.vue | addTask() : ", data);
		}
		return { addTask };
	},
};
</script>
