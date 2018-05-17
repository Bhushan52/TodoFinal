export const baseUrl = () =>{
	console.log("process.env: ");
	console.log(process.env);
	if(process.env.environment === undefined)
		return "http://localhost:8080/api";

	return "/todo-list/api";
}