/**
* Actions.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: "mysql",

  attributes: {
  	type: {
	    type: 'string',
	    enum: ['Blocked', 'Incorporated', 'In Progress', 'Ready for Test', 'Rejected', 'Accepted']
	},
	user: 'json',
	message: 'text',
	task_id: {
		model: 'Task'
	}
  }
};

