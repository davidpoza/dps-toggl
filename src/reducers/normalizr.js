import {schema} from 'normalizr';


export const tagEntity = new schema.Entity("tags", {}, { idAttribute: '_id' });
export const tagsSchema = [tagEntity];

export const userEntity = new schema.Entity("users", {}, { idAttribute: '_id' });
export const usersSchema = [userEntity];

export const projectEntity = new schema.Entity("projects", {members: [userEntity]}, { idAttribute: '_id' });
export const projectsSchema = [projectEntity];

export const taskEntity = new schema.Entity("tasks", {project: projectEntity, tags:[tagEntity]}, { idAttribute: '_id' });
export const tasksSchema = [taskEntity];

export const dateEntity = new schema.Entity("dates", {tasks: [taskEntity]}, {idAttribute:"date"});
export const dateSchema = [dateEntity];


