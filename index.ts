import {deleteEnvironment, getAllEnvironments} from "./things";

const main = async () => {
	const envs = await getAllEnvironments();
	const stoppedEnvs = envs.filter(e => e.state === "stopped");
	console.log(`There are ${stoppedEnvs.length} stopped environments.`);

	const deleteEnvironments = stoppedEnvs.map(e => {
		return deleteEnvironment(e.id).then(() => {
			console.log(`Deleted environment ${e.name} (${e.id})`);
		});
	});

	await Promise.all(deleteEnvironments);
	console.log(`Deleted ${deleteEnvironments.length} stopped environments.`);
};

main();
