/**
* Roles.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  
	connection: "mysql",

  attributes: {
  	power: 'string',
  	user_id: {
  		model: 'User'
  	},
  	project_name: {
  		model: 'Project'
  	}
  }
};

