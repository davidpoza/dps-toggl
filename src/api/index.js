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
        //en tags_id viene un array
        createTask(description, date_start, date_end, project_id, tags_id){
            return fetch(api_url+"/items/tasks", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    desc: description,
                    date_start: date_start,
                    date_end: date_end,
                    project: { id: project_id },
                    tags: tags_id
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
    }
}

export default API;