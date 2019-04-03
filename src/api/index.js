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
        createTask(token, description, date_start, date_end, project_id, tags_id){
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
                    date_start: date_start,
                    date_end: date_end,
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
        updateTask(token, task_id, description, date_start, date_end, project_id, tags){
            /*let array_tags_obj = [];
            if (tags_id != null)
                tags_id.map((e)=>{array_tags_obj.push({tags_id: e})});*/
            let composingBody = {};
            if(description!=null) composingBody.desc = description;
            if(date_start!=null) composingBody.date_start = date_start;
            if(date_end!=null) composingBody.date_end = date_end;
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
            //?fields=*.*
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
    task_tag: {
        /*updateTaskTags(token, task_id, tags){
            let array_tags_obj = [];
            if (tags_id != null)
                tags_id.map((e)=>{array_tags_obj.push({tags_id: e})});
            let composingBody = {};
            if(description!=null) composingBody.desc = description;
            if(date_start!=null) composingBody.date_start = date_start;
            if(date_end!=null) composingBody.date_end = date_end;
            if(project_id!=-1) composingBody.project = project_id;
            if(tags_id!=null) composingBody.tags = array_tags_obj

            return fetch(api_url+"/items/tasks_tags/"+task_id, {
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
        },*/
        getTagsFromTask(token, task_id){
            return fetch(api_url+"/items/tasks_tags?filter[tasks_id]="+task_id, {
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
            )
        },
        deleteTaskTags(token, task_id){
            this.getTagsFromTask(token, task_id).then((data)=>{
                if(data.data.length > 0){
                    let string_tags_delete = data.data.reduce((prev,curr)=>{
                        let previo = prev?prev.id:"";
                        let actual = curr?curr.id:""
                        return previo+","+actual
                    }, "");
                return fetch(api_url+"/items/tasks_tags/"+string_tags_delete, {
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
                            return {error: {message: "Error on delete tags of task"}};
                    }
                );
                }
                
            });                
        }
    }
}

export default API;