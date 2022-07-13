module.exports = {
    validateUser: async (req, res, next) => {
        const { email, passwordOne, passwordTwo } = req.body;
        const validEmail = new RegExp(/^[\w-\.\_]+@([\w-]+\.)+[\w-]{2,4}$/);

        if (!validEmail.test(email))
            return res.send({ success: false, message: 'El. pastas ivestas neteisingai' });
        if (passwordOne.length < 5) {
            return res.send({success: false, message: 'slaptazodis per trumpas'})
        }
        if (passwordOne !== passwordTwo) {
            return res.send({success: false, message: 'slaptazodziai nesutampa'})
        }
        next();
    },
    validateEmail: async (req, res, next) => {
        const {newEmail} = req.body
        const validEmail = new RegExp(/^[\w-\.\_]+@([\w-]+\.)+[\w-]{2,4}$/);
        if (!validEmail.test(newEmail))
            return res.send({ success: false, message: 'El. pastas ivestas neteisingai' });
        next()
    },
    validateText: async (req, res, next) => {
        const {theme, text} = req.body
        if (theme) {
            if (theme.title.length < 5) {
                return res.send({success: false, message: 'Pavadinimas per trumpas, turi būti mažiausiai 5 simboliai!'})
            }
        }
        if (text) {
            if (text.length < 10) {
                return res.send({success: false, message: 'Tekstas per trumpas, mažiausiai 10 simbolių!'})
            }
        }
        next()

    }
}
