import {schema} from 'normalizr';


export const tagEntity = new schema.Entity("tags");
export const tagsSchema = [tagEntity];

export const userEntity = new schema.Entity("users");
export const usersSchema = [userEntity];

export const projectEntity = new schema.Entity("projects", {members: [userEntity], /*tasks:[taskEntity]*/});
export const projectsSchema = [projectEntity];

export const taskEntity = new schema.Entity("tasks", {project: projectEntity, tags:[tagEntity]});
export const tasksSchema = [taskEntity];

export const dateEntity = new schema.Entity("dates", {tasks: [taskEntity]}, {idAttribute:"date"});
export const dateSchema = [dateEntity];


