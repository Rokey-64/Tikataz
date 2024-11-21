const setSesion = (session, data) => {
    session.data = data;
    session.save();
}

const getSession = (session) => {
    return session.data;
}

const destroySession = (session) => {
    session.destroy();
}


const sessionControl = {
    setSesion,
    getSession,
    destroySession
}

export default sessionControl