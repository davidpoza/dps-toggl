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
        //en tags_id viene un array
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
    }
}

export default API;