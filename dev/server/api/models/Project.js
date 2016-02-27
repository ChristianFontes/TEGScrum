

module.exports = {
	
	connection: "mysql",

  attributes: {
  	name: 'string',
  	row2: 'text',
  	row3: 'text',
    sprints: {
      collection: 'Sprints',
      via: 'project_id'
    },
    task: {
      collection: 'Task',
      via: 'project_name'
    },
    rol: {
      model: 'Roles'
    },
    user_all: {
      collection: 'User',
      via: 'project_all'
    },
    user_story: {
      collection: 'User_story',
      via: 'project_id'
    }
  }
};

