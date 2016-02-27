/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	
 	connection: "mysql",

  	attributes: {
  	name: 'string',
  	description: 'text',
  	value: 'integer',
  	type: {
	    type: 'string',
	    enum: ['Feature', 'Bug', 'Chore']
	},
	project_name: {
		model: 'Project'
	},
	actions: {
		collection: 'Actions',
		via: 'task_id'
	},
	user_story_id: {
		model: 'User_story'
	}
  }
};

