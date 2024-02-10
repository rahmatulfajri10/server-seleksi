const createTokenUser = (user) => {
    return {
      id: user.id,
      username: user.username,
      active: user.active,
    };
};



  
module.exports = { createTokenUser};