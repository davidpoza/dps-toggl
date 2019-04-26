import fetch from 'isomorphic-fetch'; //para compatibilidad de fetch con navegadores antiguos
import utils from '../utils';
const api_url = "https://dpstogglapi1.davidinformatico.com/_";

const API = {
    user: {
        login(email, password){
            return fetch(api_url+"/auth/authenticate", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => {
                    if(data.data)
                        return(API.user.getUserInfo(data.data.token))
                    else if(data.error)
                        throw data.error;
                }
            ).then(
                (data) => data
            );
        },

        refreshToken(token){
            return fetch(api_url+"/auth/refresh", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: token
                })
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => data
            );
        },

        getUserInfo(token){
            return fetch(api_url+"/users/me?fields=*,avatar.*", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            }).then(
                (response)=>response.json()                
            ).then(
                (data)=>{
                    //quiero tener el token en el estado para renovarlo
                    data.data.token = token;
                    return data;
                }
            );
        },

        //devuelve todos los usuarios menos a sí mismo
        fetchUsers(token, user_id){
            return fetch(api_url+"/users?filter[id][neq]="+user_id, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => data
            );
        }
    },
    task: {
        //en tags_id viene un array de tags_id, hay que componer un objeto
        createTask(token, description, date, start_hour, end_hour, project_id, tags_id, user_id){
            let array_tags_obj = [];
            tags_id.map((e)=>{array_tags_obj.push({tags_id: e})});
            return fetch(api_url+"/items/tasks", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                },
                body: JSON.stringify({
                    desc: description,
                    date,
                    start_hour,
                    end_hour,
                    project: { id: project_id },
                    tags: array_tags_obj,
                    user: user_id
                })
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => data
            );
        },
        deleteTask(token, task_id){
            return fetch(api_url+"/items/tasks/"+task_id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                function(response){
                    if(response.status == 204) //204 (no-content) es el codigo de exito en el borrado segun directus
                        return {data: {id: task_id}};
                    else
                        return {error: {message: "Error on delete task"}};
                }
            );
        },
        //en tags_id viene un array de tags_id, hay que componer un objeto
        updateTask(token, task_id, description, date, start_hour, end_hour, project_id, tags){
            let composingBody = {};
            if(description!=null) composingBody.desc = description;
            if(date!=null) composingBody.date = date;
            if(start_hour!=null) composingBody.start_hour = start_hour;
            if(end_hour!=null) composingBody.end_hour = end_hour;
            if(project_id!=-1) composingBody.project = project_id;
            if(tags!=null) composingBody.tags = tags;

            return fetch(api_url+"/items/tasks/"+task_id, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                },
                body: JSON.stringify(composingBody)
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => data
            );
        },
        fetchTasks(token){
            return fetch(api_url+"/items/tasks?fields=*,project.*,tags.*,tags.tags_id.*", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => data
            );
        },
        fetchTask(token,task_id){
            return fetch(api_url+"/items/tasks?fields=*,project.*,tags.*,tags.tags_id.*&single=1&filter[id][eq]="+task_id, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => data
            );
        },
        fetchAllDates(token, user_id){
            return fetch(api_url+"/items/tasks?fields=date,user.id&filter[user][eq]="+user_id+"&groups=date&sort=-date", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => data
            );
        },
        fetchTasksByDate(token, date, user_id){
            return fetch(api_url+"/items/tasks?fields=*,project.*,tags.*,tags.tags_id.*,user.id&filter[user][eq]="+user_id+"&filter[date][eq]="+date, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                (response)=>response.json()                
            ).then(
                (data)=>{
                    if(data.data != undefined)
                        return {date: date, time: data.data.reduce((prev,curr)=>{
                            curr = utils.diffHoursBetHours(curr?curr.start_hour:"00:00:00", curr?curr.end_hour:"00:00:00")
                            return(prev+curr);
                        },0), collapsed: false, tasks:data.data};
                    else
                        return {date: date, collapsed: false, tasks:[], error:data.error};
                }
            );
        },
        fetchTasksByProject(token, project_id){
            return fetch(api_url+"/items/tasks?fields=*,project.*&filter[project.id][eq]="+project_id, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => data
            );
        },

        /*
        Elimina todas las referencias a un proyecto concreto que pudiera haber en cualquier task.
        Para ello primero necesito obtener la lista task id que tengan dicho proyecto asignado. (puede resultar una lista vacia).
        Posteriormente hago una llamada a la api con un patch, indicando todos los task id separados por comas. En dicho patch
        simplemente pongo a null la referencia a proyecto.
        */
        deleteProjectRefsFromTask(token, project_id){
            return fetch(api_url+"/items/tasks?filter[project][eq]="+project_id, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                (response)=>response.json()                
            ).then(
                (data)=>{
                    if(data.data){
                        let tasks_id = data.data.reduce((prev,curr, index)=>{ return (index==0? curr.id:prev+","+curr.id) }, "" );
                        if (tasks_id != "")
                            return fetch(api_url+"/items/tasks/"+tasks_id, {
                                method: "PATCH",
                                headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json",
                                    "Authorization": "Bearer "+ token
                                },
                                body: JSON.stringify({project:null})
                            })
                        else //no hay ninguna task en este proyecto, devolvemos una promesa resuelta vacia para continuar el chain
                            return new Promise((resolve, reject)=>(resolve({data:{}})));
                    }
                    else if(data.error){
                        throw data.error;
                    }
                }
                
            )
        },

        /*
        Elimina todas las relaciones user-project que existan
        */
        deleteUserProjectRelations(token, user_id, project_id){
            return fetch(api_url+"/items/tasks?filter[project][eq]="+project_id, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            })
            .then(
                (response)=>response.json()                
            ).then(
                (data)=>{
                    if(data.data){
                        let tasks_id = data.data.reduce((prev,curr, index)=>{ return (index==0? curr.id:prev+","+curr.id) }, "" );
                        return fetch(api_url+"/items/tasks/"+tasks_id, {
                            method: "PATCH",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                                "Authorization": "Bearer "+ token
                            },
                            body: JSON.stringify({project:null})
                        })
                    }
                    else if(data.error){
                        throw data.error;
                    }
                }
                
            )
            .then(
                (response)=>response.json()                
            ).then(
                (data) => data
            );
        },
    },

    
    project: {
        createProject(token, name, color, owner_id){
            return fetch(api_url+"/items/projects", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                },
                body: JSON.stringify({
                    name: name,
                    color: color,
                    owner: owner_id
                })
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => data
            );
        },

        //en el futuro cuando implemente mi propia api limitaré la consulta de un proyecto si no se es miembro
        fetchProjectById(token, project_id){
            return fetch(api_url+"/items/projects/"+project_id+"?single=1&fields=*.*, members.*", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => data
            );
        },

        fetchProjects(token){
            return fetch(api_url+"/items/projects", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => data
            );
        },
        /**
         * Devuelve los proyectos de los que somos propietarios y aquellos en los que somos miembros
         */
        fetchProjectsByMember(token, owner_id){
            return fetch(api_url+"/items/projects?fields=*.*&filter[owner][eq]="+owner_id, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => data
            )          
        },

        deleteProject(token, project_id){
            return fetch(api_url+"/items/projects/"+project_id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                (response)=>{
                    if(response.status == 204) //204 (no-content) es el codigo de exito en el borrado segun directus
                        return {data: {id: project_id}};
                    else
                        return {error: {message: "Error on delete project"}};
                }
            );
        },

        //members es una array de id de usuarios
        updateProject(token, project_id, project_name, project_color, project_members){
            let composingBody = {};
            if(project_name!=null) composingBody.name = project_name;
            if(project_color!=null) composingBody.color = project_color;
            if(project_members!=null) composingBody.members = project_members;

            return fetch(api_url+"/items/projects/"+project_id, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                },
                body: JSON.stringify(composingBody)
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => data
            );
        },



    },
    tag: {
        fetchTagsByUser(token,user_id){
            return fetch(api_url+"/items/tags?sort=name&filter[user][eq]="+user_id, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => data
            );
        },
        createTag(token, name, user_id){
            return fetch(api_url+"/items/tags", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                },
                body: JSON.stringify({
                    name: name,
                    user: user_id
                })
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => data
            );
        },
        deleteTag(token, tag_id){
            return fetch(api_url+"/items/tags/"+tag_id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                (response)=>{
                    if(response.status == 204) //204 (no-content) es el codigo de exito en el borrado segun directus
                        return {data: {id: tag_id}};
                    else
                        return {error: {message: "Error on delete tag"}};
                }
            );
        },

        updateTag(token, tag_id, tag_name){
            return fetch(api_url+"/items/tags/"+tag_id, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                },
                body: JSON.stringify({name: tag_name})
            }).then(
                (response)=>response.json()                
            ).then(
                (data) => data
            );
        },
    },
}

export default API;