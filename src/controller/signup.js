const express = require('express')
const validator = require('validator')
const { body, validationResult } = require('express-validator')
const request = require('request')

exports.signup = [
    body('fname', 'First Name Must be Required').isLength({ min: 3 }).withMessage({ error: 'Atleast First Name Must be 3 in Length' }).trim().escape(),
    body('lname', 'Last Name Must be Required').isLength({ min: 3 }).withMessage({ error: 'Atleast Last Name Must be 3 in Length' }).trim().escape(),
    body('nationality', 'First Name Must be Required').isLength({ min: 3 }).withMessage({ error: 'Atleast Nationality Must be 3 in Length' }).trim().escape(),
    body('address', 'Address Must be Required').isLength({ min: 3 }).withMessage({ error: 'Atleast Address be 8 in Length' }).trim().escape(),
    body('email', 'Email Must be Required').isLength({ min: 3 }).withMessage({ error: 'Atleast Email Must be 3 in Length' }).trim().escape(),
    body('password', 'Password Name Must be Required').isLength({ min: 6 }).withMessage({ error: 'Atleast Password Must be 6 in Length' }).trim().escape(),
    body('confirm_password', 'Confirm Pasword Must be Required').isLength({ min: 6 }).withMessage({ error: 'Atleast Password Must be 6 in Length' }).trim().escape(),
    (req, res) => {

        try {

            // Check if Errors in inputs data
            const errors = validationResult(req)

            if (!errors.isEmpty()) {

                const errorStore = errors.array() // This store shold be any array of object

                const errorMsg = errorStore[0].msg.error

                req.session.message = {
                    type: 'danger',
                    intro: 'Error: ',
                    message: errorMsg
                }
                return res.redirect('/signup')
            }
            const { password, confirm_password, email } = req.body

            const isSamePassword = (password, confirm_password) => {
                if (password === confirm_password) {
                    return true
                } else {
                    return false
                }
            }

            const includePassword = (password) => {
                if (password.includes('password')) {
                    return true
                } else if (password.includes('Password')) {
                    return true
                } else {
                    return false
                }
            }

            if (!validator.isEmail(email)) {
                req.session.message = {
                    type: 'danger',
                    intro: 'Validation Error:',
                    message: 'Invalid Email try again !!!'
                }

                return res.redirect('/signup')
            }

            if (!isSamePassword(password, confirm_password)) {
                req.session.message = {
                    type: 'danger',
                    intro: 'Validation Error:',
                    message: 'Password dos not Match try again !!!'
                }

                return res.redirect('/signup')
            }

            if (includePassword(password)) {
                req.session.message = {
                    type: 'danger',
                    intro: 'Validation Error:',
                    message: 'Password Should not include Password !!!'
                }

                return res.redirect('/signup')
            }

            const url = `${process.env.UMUKORO_API}/users/signup`

            request({
                url,
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: req.body,
                json: true
            }, (err, response, body) => {

                if (err) {

                    req.session.message = {
                        type: 'danger',
                        intro: 'Server Error: ',
                        message: 'Service Tempolary Unvailable Try again !!!'
                    }
                    return res.redirect('/signup')
                }

                const { error, user, token } = body



                if (error) {

                    req.session.message = {
                        type: 'danger',
                        intro: 'Validation Error: ',
                        message: error.message
                    }
                    return res.redirect('/signup')
                }


                if (user) {
                    const data = {
                        user: {
                            _id: user._id,
                            fname: user.fname,
                            lname: user.lname,
                            nationality: user.nationality,
                            address: user.address,
                            phone: user.phone,
                            email: user.email,
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt,
                            tasks: []
                        },
                        token
                    }

                    res.cookie('data', data)


                    return res.redirect('/login')
                }


                res.redirect('/404Page')
            })
        } catch (error) {

        }

    }
]

exports.signin = [
    (req, res) => {
        res.render('signup')
    }
]