const User = require('../../models/User');

const query = {
    Query: {
        getUser: async (parent, { username }) => {
            try {
                const user = await User.findOne({username});
                if(!user) throw Error('Usuario no registrado');
                return user;
            } catch (error) {
                throw new Error(error.message);
            }
        }
    }
}

module.exports = query;