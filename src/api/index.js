import fetch from 'isomorphic-fetch';
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
                function(response){
                    return response.json();
                }
            ).then(
                function(data){
                    if(data.data)
                        return(API.user.getUserInfo(data.data.token))
                    return data;
                }
            ).then(
                function(data){
                    return data;
                }
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
                function(response){
                    return response.json();
                }
            ).then(
                function(data){
                    return data;
                }
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
                function(response){
                    return response.json();
                }
            ).then(
                function(data){
                    //quiero tener el token en el estado para renovarlo
                    data.data.token = token;
                    return data;
                }
            );
        }
    },
    task: {
        //en tags_id viene un array de tags_id, hay que componer un objeto
        createTask(token, description, date, start_hour, end_hour, project_id, tags_id){
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
                    tags: array_tags_obj
                })
            }).then(
                function(response){
                    return response.json();
                }
            ).then(
                function(data){
                    return data;
                }
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
            /*let array_tags_obj = [];
            if (tags_id != null)
                tags_id.map((e)=>{array_tags_obj.push({tags_id: e})});*/
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
                function(response){
                    return response.json();
                }
            ).then(
                function(data){
                    return data;
                }
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
                function(response){
                    return response.json();
                }
            ).then(
                function(data){
                    return data;
                }
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
                function(response){
                    return response.json();
                }
            ).then(
                function(data){
                    return data;
                }
            );
        },
        fetchAllDates(token){
            return fetch(api_url+"/items/tasks?fields=date&groups=date&sort=-date", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                function(response){
                    return response.json();
                }
            ).then(
                function(data){
                    return data;
                }
            );
        },
        fetchTasksByDate(token, date){
            return fetch(api_url+"/items/tasks?fields=*,project.*,tags.*,tags.tags_id.*&filter[date][eq]="+date, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                function(response){
                    return response.json();
                }
            ).then(
                function(data){
                    if(data.data != undefined)
                        return {date: date, tasks:data.data};
                    else
                        return {date: date, tasks:[], error:data.error};
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
                function(response){
                    return response.json();
                }
            ).then(
                function(data){
                    return data;
                }
            );
        },
    },

    project: {
        //en tags_id viene un array de tags_id, hay que componer un objeto
        createProject(token, name, desc, color){
            return fetch(api_url+"/items/projects", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                },
                body: JSON.stringify({
                    name: name,
                    desc: desc,
                    color: color,
                })
            }).then(
                function(response){
                    return response.json();
                }
            ).then(
                function(data){
                    return data;
                }
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
                function(response){
                    return response.json();
                }
            ).then(
                function(data){
                    return data;
                }
            );
        },
        fetchProjectsByOwner(token, owner_id){
            return fetch(api_url+"/items/projects?fields=*.*&filter[owner][eq]="+owner_id, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                function(response){
                    return response.json();
                }
            ).then(
                function(data){
                    return data;
                }
            )          
        }

    },
    tag: {
        fetchTags(token){
            return fetch(api_url+"/items/tags", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                function(response){
                    return response.json();
                }
            ).then(
                function(data){
                    return data;
                }
            );
        },
    },
}

export default API;