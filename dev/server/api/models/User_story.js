/**
* User_story.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	connection: "mysql",

  attributes: {

  	nombre: 'string',
  	descripcion: 'text',
  	estado: 'string',
    prioridad: 'integer',
  	sprint_nombre: {
  		model: 'Sprints'
  	},
  	task_name: {
  		collection: 'Task',
  		via: 'user_story_id'
  	},
    project_id: {
      model: 'Project'
    }
  }
};

