module.exports = {
    internalServerError: 'Ocorreu um erro inesperado em nosso sistema, Isso não é sua culpa. Tente mais tarde',
    invalidToken: 'Token is Invalid',
    passwordCodeExpiration: 'password update code is expired',
    usernameAndPasswordRequired: 'username and password are required on body',
    userCreationSuccess: 'User has created. We sent an email to confirm and activate your account',
    userCreationError: 'There was an internal error while try to save user in system database. Try again later',
    usernameRequired: 'username is required as query parameter',
    updatePasswordEmail: "update password code has been sent to user's email",
    activationAccountEmail: "activaton code has been sent to user's email",
    userProfileClear: "user's profile is cleared",
    bodyRequired: 'body request is required',
    userDeactivated: 'user is deactivated',
    userActive: 'User account is active and ready to be used',
    userNotActivatedError: 'user was not activated',
    passwordUpdated: 'Password has been updated',
    userRemoved: 'User has been removed permanently',
    activationCodeInvalid: 'activation code is invalid or expired',
    invalidCredentials: 'Email or password invalid',
    success: 'Success',
    error: 'Error',
    adminTokenPresentError: 'admin token is not present',
    adminTokenInvalidError: 'admin access token invalid',
    bearerTokenPresentError: 'bearer token not present',
    confirmEmailContent: 'Confirm your account here',
    updatePasswordEmailContent: 'Update your password here',
    badCredentials: 'bad credentials',
    userNotActive: 'User is not active yet',
    passwordError: 'Invalid Password',
    passwordUpdateSubject: 'Update password code',
    passwordUpdateMessage: 'Use the following code to update password account',
    activationUpdateSubject: 'User account activation',
    activationUpdateMessage: 'Use the following code to activate your account',
    passwordFormatError: 'Invalid password format',
    emailFormatError: 'email format is invalid',
    emailRequiredError: 'email is required',
    emailError: 'email already exists',
    emailNotificatonError: 'We are not able to send email notification. Try again later',
    activationCodeError: 'Invalid code',
    userNotFoundError: 'user not found',
    successPageTextLink: 'Login',
    pageNotFound: 'Page not Found',
    loginPage: {
        title: 'Login',
        email: 'e-mail',
        password: 'Password',
        btn: 'Login',
        image: '/img/background-company-logo.jpg',
        firstLinkText: 'Activate Here',
        tip: "Don't have an account?",
        secondLinkText: 'Sign up',
        thirdLinkText: 'Forgot Password',
    },
    createUserPage: {
        nameInput: 'Name',
        title: 'Sign Up',
        email: 'e-mail',
        password: 'Password',
        btn: 'Register',
        image: '/img/background-company-logo.jpg',
        firstLinkText: 'Login',
        tip: 'Already have an account?',
    },
    activateUserAccountPage: {
        codeInput: 'Activation Code',
        title: 'Activate User',
        email: 'e-mail',
        btn: 'Confirm Activation',
        image: '/img/background-company-logo.jpg',
        firstLinkText: 'Send Email',
        tip: 'Get activation code from email?',
    },
    updateUserPasswordPage: {
        title: 'Update password',
        email: 'e-mail',
        btn: 'Send email',
        image: '/img/background-company-logo.jpg',
    },
    userNewPasswordPage: {
        title: 'Update Password',
        email: 'e-mail',
        password: 'New Password',
        btn: 'Update',
        image: '/img/background-company-logo.jpg',
    },
}
