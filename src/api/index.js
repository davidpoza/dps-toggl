import fetch from 'isomorphic-fetch'; //para compatibilidad de fetch con navegadores antiguos
import utils from '../utils';
import config from '../config/config';
const api_url = config.api_url;

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

        register(email, password){
            return fetch(api_url+"/auth/register", {
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
                (data) => data
            );
        },

        refreshToken(token){
            return fetch(api_url+"/auth/refresh", {
                method: "POST",
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
        },

        getUserInfo(token){
            return fetch(api_url+"/users/me", {
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
        fetchUsers(token){
            return fetch(api_url+"/users", {
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
        },

        fetchUser(token, user_id){
            return fetch(api_url+"/users/"+user_id, {
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
        },

        updateUser(token, user_id, data){
            //subimos un form-data en lugar del json habitual
            let form_data = new FormData();
            if(data.avatar)
                form_data.append("avatar", data.avatar);
            form_data.append("first_name", data.first_name);
            form_data.append("last_name", data.last_name);

            return fetch(api_url+"/users/"+user_id, {
                method: "PUT",
                //la cabecera Content-Type se añade automaticamente cuando enviamos un objeto FormData
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: form_data,
            }).then(
                (response)=>response.json()
            ).then(
                (data) => data
            );
        },

        deleteUser(token, task_id){
            return fetch(api_url+"/users/"+task_id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                function(response){
                    if(response.status == 200)
                        return {data: {_id: task_id}};
                    else
                        return {error: {message: "Error on delete user"}};
                }
            );
        },

    },
    task: {
        //en tags_id viene un array de ids
        createTask(token, description, date, start_hour, end_hour, project_id, tags_id, user_id){
            let array_tags_obj = [];
            return fetch(api_url+"/tasks", {
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
                    project: project_id,
                    tags: tags_id,
                    user: user_id
                })
            }).then(
                (response)=>response.json()
            ).then(
                (data) => data
            );
        },
        deleteTask(token, task_id){
            return fetch(api_url+"/tasks/"+task_id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                function(response){
                    if(response.status == 200)
                        return {data: {_id: task_id}};
                    else
                        return {error: {message: "Error on delete task"}};
                }
            );
        },
        //en add_tags viene un array de ObjectId de los tags que queremos añadir
        //en delete_tags viene un array de ObjectId de los tags que queremos eliminar
        updateTask(token, task_id, description, date, start_hour, end_hour, project_id, add_tags, delete_tags){
            let composingBody = {};
            if(description!=null) composingBody.desc = description;
            if(date!=null) composingBody.date = date;
            if(start_hour!=null) composingBody.start_hour = start_hour;
            if(end_hour!=null) composingBody.end_hour = end_hour;
            if(project_id!=-1) composingBody.project = project_id;
            if(add_tags!=null) composingBody.add_tags = add_tags;
            if(delete_tags!=null) composingBody.delete_tags = delete_tags;

            return fetch(api_url+"/tasks/"+task_id, {
                method: "PUT",
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
        fetchTasks(token, limit){
            let url = "";
            if(limit)
                url = api_url+"/tasks?limit="+limit;
            else
                url = api_url+"/tasks";

            return fetch(url, {
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
            return fetch(api_url+"/tasks/"+task_id, {
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
        }

    },


    project: {
        createProject(token, name, color, owner_id){
            return fetch(api_url+"/projects", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                },
                body: JSON.stringify({
                    name: name,
                    color: color
                })
            }).then(
                (response)=>response.json()
            ).then(
                (data) => data
            );
        },

        fetchProjectById(token, project_id){
            return fetch(api_url+"/projects/"+project_id, {
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
        fetchUserProjects(token){
            return fetch(api_url+"/projects", {
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
            return fetch(api_url+"/projects/"+project_id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                (response)=>{
                    if(response.status == 200)
                        return {data: {id: project_id}};
                    else
                        return {error: {message: "Error on delete project"}};
                }
            );
        },

        //members es una array de id de usuarios
        updateProject(token, project_id, project_name, project_color, add_members, delete_members){
            let composingBody = {};
            if(project_name!=null) composingBody.name = project_name;
            if(project_color!=null) composingBody.color = project_color;
            if(add_members!=null) composingBody.add_members = add_members;
            if(delete_members!=null) composingBody.delete_members = delete_members;

            return fetch(api_url+"/projects/"+project_id, {
                method: "PUT",
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
        fetchUserTags(token){
            return fetch(api_url+"/tags", {
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
        createTag(token, name){
            return fetch(api_url+"/tags", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                },
                body: JSON.stringify({
                    name: name                })
            }).then(
                (response)=>response.json()
            ).then(
                (data) => data
            );
        },
        deleteTag(token, tag_id){
            return fetch(api_url+"/tags/"+tag_id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            }).then(
                (response)=>{
                    if(response.status == 200)
                        return {data: {id: tag_id}};
                    else
                        return {error: {message: "Error on delete tag"}};
                }
            );
        },

        updateTag(token, tag_id, tag_name){
            return fetch(api_url+"/tags/"+tag_id, {
                method: "PUT",
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

    dashboard: {
        fetchAllDatesBetween(token, start_date, end_date){
            return fetch(api_url+"/tasks?date_start="+start_date+"&date_end="+end_date, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ token
                }
            })
            .then(response => response.json())
            .then(data => data.data)
            .catch(err => err)
        },


    }
}

export default API;