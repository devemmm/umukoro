const express = require('express')
const request = require('request')

exports.login = [
    (req, res) => {

        const { email, password } = req.body


        if (email === '' || password == '') {
            req.session.message = {
                type: 'danger',
                intro: 'Empty fields! ',
                message: 'Please insert the requested information.'
            }
            return res.redirect('/login')
        }

        const url = `${process.env.UMUKORO_API}/users/login`

        request({
            url,
            method: "POST",
            body: {
                email,
                password
            },
            json: true
        }, (err, response, body) => {

            if (err) {

                req.session.message = {
                    type: 'danger',
                    intro: 'System ',
                    message: 'Service Temporary Unvailable'
                }
                return res.redirect('/login')
            }

            const { error, user, token } = body



            if (error) {

                req.session.message = {
                    type: 'danger',
                    intro: 'Validation Error: ',
                    message: error.message
                }
                return res.redirect('/login')
            }


            if (user) {
                const data = {
                    user: {
                        _id: user._id,
                        isAdmin: user.isAdmin,
                        profile: user.profile,
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

                if (!user.isAdmin) {
                    return res.redirect('/home')
                }

                return res.redirect('/admin/dashboard')

            }

            res.redirect('/404Page')
        })
    }
]

exports.getLogin = [
    (req, res) => {
        res.render('login')
    }
]