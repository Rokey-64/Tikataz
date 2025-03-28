/**
 * This service is responsible for managing the user session.
 */
const sessionService = {
    setUserSession: async (session, key, value) => {
      session[key] = value;
      await session.save(); 
    },
  
    getUserSession: async (session, key) => {
      return session[key];
    },
  
    destroySession: async (session) => {
      await session.destroy();
    },
    deleteSession: async (session, key) => {
      delete session[key];
      await session.save();
    }
  };

export default sessionService;