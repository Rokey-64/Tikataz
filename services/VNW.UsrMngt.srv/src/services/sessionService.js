/**
 * This service is responsible for managing the user session.
 */
const sessionService = {
  setUserSession: async (session, key, value) => {
    try {
      session[key] = value;
      await session.save();
      return { success: true };
    } catch (error) {
      console.error('Lỗi khi set session:', error);
      return { success: false, error };
    }
  },

  getUserSession: async (session, key) => {
    try {
      return session[key];
    } catch (error) {
      console.error('Lỗi khi get session:', error);
      return null;
    }
  },

  destroySession: async (session) => {
    try {
      await session.destroy();
      return { success: true };
    } catch (error) {
      console.error('Lỗi khi destroy session:', error);
      return { success: false, error };
    }
  }
};

export default sessionService;

