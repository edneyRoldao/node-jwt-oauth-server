function copyObject(original) {
    return JSON.parse(JSON.stringify(original))
}


function removeUserPassword(user) {
    const _user = copyObject(user)
    delete _user.password
    return _user
}


module.exports = {
    copyObject,
    removeUserPassword
}

