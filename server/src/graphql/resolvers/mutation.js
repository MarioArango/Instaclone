const User = require('../../models/User');
const { encriptar, comparar }  = require('../../util/bcrypt');
const { signToken } = require('../../util/jwt');

const mutation = {
    Mutation: {
        register: async (parent, { user }) => {
            try {
                
                const userEmail = await User.findOne({email: user.email});
                if(userEmail) throw Error('Email en uso');

                const userUsername = await User.findOne({username: user.username});
                if(userUsername) throw Error('Username en uso');

                const newUser = new User(user);
                newUser.password = await encriptar(newUser.password); 
                newUser.save(); 
                
                return newUser;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        login: async (parent, { user }) => {
            try {
                const userEmail = await User.findOne({ email: user.email });
                if (!userEmail) throw Error('Email no registrado');

                const verf = await comparar(user.password, userEmail.password);
                if(!verf) throw Error('Contraseña incorrecta');

                const userSignToken = {
                    name: userEmail.name,
                    username: userEmail.username,
                    email: userEmail.email,
                }
                const token = signToken(userSignToken);

                return {token} ;

            } catch (error) {
                throw new Error(error.message);
            }
        }    
    }
}

module.exports = mutation;