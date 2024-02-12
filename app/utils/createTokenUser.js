const createTokenUser = (user) => {
    return {
      id: user.id,
      username: user.username,
      active: user.active,
      role: user.role
    };
};



  
module.exports = { createTokenUser};