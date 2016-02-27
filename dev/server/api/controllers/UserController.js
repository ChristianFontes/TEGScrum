var bcrypt = require('bcrypt');

module.exports = {

	login: function (req, res) {

        var email = req.param('email');
        var password = req.param('password');

        if (!email || !password) {
            return res.json(401, { err: 'Correo y Contraseña son necesarios' });
        }
        User.find({ where: { email: email }, limit: 1
        }, function(err, users){
            if(!users.length){
                return res.json(401, { err: 'Correo o Contraseña son incorrectos' });
            }
            var user = users[0];
            User.comparePassword(password, user, function(err, valid){
                if(err){
                    return res.json(403, { err: 'forbidden' });
                }
                if(!valid){
                    console.log('not valid = true');
                    return res.json(401, { err: 'Correo o Contraseña son incorrectos'});
                }else{
                    return res.json(200, {
                        user: user,
                        token: jwToken.issue({ id: user.id })
                    });
                }
            });
        });
    },

	create: function (req, res){
		var userObj = req.allParams();
		User.create(userObj, function (err, user){
			if(err){
				return res.json(400, {err: err});
			}
			if (user) {
		        res.json(200, {user: user, token: jwToken.issue({id: user.id})});
		    }
		})
	}
};

