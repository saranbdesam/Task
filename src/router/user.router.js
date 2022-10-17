const router = require('express').Router();
const { signupValidation, signinValidation } = require('../validation/user.validation');
const { errorMsgFormat, errorFormat, sucessFormat } = require('../utilities/msgFormat')
const user = require('../controller/user.controller');
const passport = require('passport');
require('../controller/google.controller')

//<--*** Login with Google ***-->
router.get('/sign_google', (req, res) => {
    res.redirect('/api/user/auth')
});

router.get('/auth', passport.authenticate('google', {
    scope:
        ['email', 'profile']
}));
router.get('/auth/callback', passport.authenticate('google', { session: false }), async (req, res) => {
    return res.status(200).send(sucessFormat(await user.createToken(req.user)));
});
//<--** Sing-Up with Email and Password **-->
router.post('/signup', async (req, res) => {
    try {
        let { error } = signupValidation(req.body);
        if (error) return res.status(400).send(errorFormat(error));
        return await user.createUser(req, res);
    } catch (err) {
        res.status(400).send(errorMsgFormat(err));
    }
});
//<--** Sign-In with Email and Password **-->
router.post('/signin', (req, res) => {
    try {
        let { error } = signinValidation(req.body);
        if (error) return res.status(400).send(errorFormat(error));
        return user.login(req, res);
    } catch (err) {
        res.status(400).send(errorMsgFormat(err));
    }
})

module.exports = router;