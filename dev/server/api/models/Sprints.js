
module.exports = {

	connection: "mysql",

  attributes: {

  	nombre: 'string',
  	inicio: 'date',
  	fin: 'date',
  	project_id: {
      model: 'Project'
    },
    user_story: {
      collection: 'User_story',
      via: 'sprint_nombre'
    }
  }
};

