const { body, validationResult } = require('express-validator')
const request = require('request')
const { geneUpdatePayload } = require('../helps/generatePayload')


const home = [
    (req, res) => {

        const token = req.token

        request({
            url: `${process.env.UMUKORO_API}/tasks`,
            method: 'GET',
            headers: {
                Authorization: token
            },
            json: true
        }, (err, response, body) => {
            if (err) {

                req.session.message = {
                    type: 'danger',
                    intro: 'Server Error: ',
                    message: 'Somethong Went Wrong please Try Again'
                }

                return res.redirect('/404Page')
            }

            return res.render('user-home', {
                user: req.user,
                tasks: body
            })
        })
    }
]

const logout = [
    (req, res) => {

        if (!req.user) {
            return res.redirect('/404Page')
        }

        const token = req.token
        res.clearCookie('data')

        //Logout From my API SERVER
        request({
            url: `${process.env.UMUKORO_API}/users/logout`,
            method: 'POST',
            headers: {
                Authorization: token
            },
            json: true
        }, (err, response, body) => {
            if (err) {
                return res.send('Somethong Went Wrong')
            }

            const arrResponse = Object.entries(body)

            if (arrResponse.length === 0) {
                res.redirect('/')
            } else {
                res.redirect('/404Page')
            }
        })
    }
]

const getNewTasks = [
    (req, res) => {
        res.render('user-newTask', { user: req.user, token: req.token })
    }
]

const postNewTasks = [
    body('level', 'Academic Level Must be Required').isLength({ min: 2 }).withMessage({ error: 'Atleast Level Must be 2 in Length' }).trim().escape(),
    body('type', 'Type of Task Must be Required').isLength({ min: 3 }).withMessage({ error: 'Atleast Type Must be 3 in Length' }).trim().escape(),
    body('subject', 'Subject Must be Required').isLength({ min: 3 }).withMessage({ error: 'Atleast Subject  Must be 3 in Length' }).trim().escape(),
    body('title', 'Paper Title Must be Required').isLength({ min: 3 }).withMessage({ error: 'Atleast Title Must be 3 in Length' }).trim().escape(),
    body('deadline', 'Deadline Must be Required').isLength({ min: 10 }).withMessage({ error: 'Atleast Deadline Must be 10 in Length' }).trim().escape(),
    body('details', 'Description Must be Required').isLength({ min: 5 }).withMessage({ error: 'Atleast Description Must be 5 in Length' }).trim().escape(),
    (req, res) => {

        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                const errorStore = errors.array() // This store shold be any array of object

                const errorMsg = errorStore[0].msg.error

                req.session.message = {
                    type: 'danger',
                    intro: 'Validation Error: ',
                    message: errorMsg
                }
                return res.redirect('/newTasks')
            }

            request({
                url: `${process.env.UMUKORO_API}/tasks`,
                method: 'POST',
                headers: {
                    Authorization: req.token
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
                    return res.send('/newTasks')
                }

                res.redirect('/home')
            })
        } catch (error) {
            return res.redirect('404Page')
        }
    }
]


const tasks = [
    (req, res) => {

        const token = req.token

        request({
            url: `${process.env.UMUKORO_API}/tasks`,
            method: 'GET',
            headers: {
                Authorization: token
            },
            json: true
        }, (err, response, body) => {
            if (err) {
                req.session.message = {
                    type: 'danger',
                    intro: 'Server Error: ',
                    message: 'Service Tempolary Unvailable Try again !!!'
                }
                return res.redirect('/home')
            }

            res.render('user-tasks', { user: req.user, tasks: body })
        })
    }
]

const deleteTask = [
    (req, res) => {

        try {

            request({
                url: `${process.env.UMUKORO_API}/tasks/${req.params.id}`,
                method: 'DELETE',
                headers: {
                    Authorization: req.token
                },
                json: true
            }, (err, response, body) => {
                if (err) {
                    req.session.message = {
                        type: 'danger',
                        intro: 'Server Error: ',
                        message: 'Service Tempolary Unvailable Try again !!!'
                    }
                    return res.redirect('/home')
                }

                req.session.message = {
                    type: 'danger',
                    intro: 'Server Error: ',
                    message: 'Delete Task Successfull'
                }
                res.redirect('/home')
            })

        } catch (error) {
            return res.redirect('404Page')
        }

    }
]

const inbox = [
    (req, res) => {
        res.render('user-inbox', { user: req.user })
    }
]

const invoice = [
    (req, res) => {
        res.render('user-invoice')
    }
]

const notifications = [
    (req, res) => {
        res.render('user-notifications', { user: req.user })
    }
]

const documents = [
    (req, res) => {


        request({
            url: `${process.env.UMUKORO_API}/tasks`,
            method: 'GET',
            headers: {
                Authorization: req.token
            },
            json: true
        }, (err, response, body) => {
            if (err) {
                return res.redirect('/404Page')
            }

            res.render('user-documents', { user: req.user, tasks: body })
        })
    }
]

const description = [
    (req, res) => {
        res.render('user-details')
    }
]

const profile = [
    (req, res) => {
        res.render('user-profile', { user: req.user })
    }
]

const settings = [
    (req, res) => {
        res.render('user-settings', { user: req.user })
    }
]

const updateProfile = [
    (req, res) => {

        try {

            request({
                url: `${process.env.UMUKORO_API}/users/me`,
                method: 'PATCH',
                headers: {
                    Authorization: req.token
                },
                body: geneUpdatePayload(req.body),
                json: true
            }, (err, response, body) => {
                if (err) {

                    req.session.message = {
                        type: 'danger',
                        intro: 'Server Error: ',
                        message: err.message
                    }

                    return res.redirect('/404Page')
                }

                const { error } = body

                if (error) {
                    req.session.message = {
                        type: 'danger',
                        intro: 'Server Error: ',
                        message: error.message
                    }

                    return res.redirect('/404Page')
                }



                const data = {
                    user: {
                        _id: body._id,
                        isAdmin: body.isAdmin,
                        profile: body.profile,
                        fname: body.fname,
                        lname: body.lname,
                        nationality: body.nationality,
                        address: body.address,
                        phone: body.phone,
                        email: body.email,
                        createdAt: body.createdAt,
                        updatedAt: body.updatedAt,
                        tasks: []
                    },
                    token: req.token
                }

                res.cookie('data', data)

                req.session.message = {
                    type: 'danger',
                    intro: 'Server Error: ',
                    message: 'Update Successfull !!!'
                }
                res.redirect('/home')
            })

        } catch (error) {
            return res.res.redirect('/404Page')
        }
    }
]

const page404 = [
    (req, res) => {
        res.render('404Page')
    }
]

module.exports = {
    home,
    logout,
    getNewTasks,
    postNewTasks,
    tasks,
    deleteTask,
    inbox,
    invoice,
    notifications,
    documents,
    description,
    profile,
    settings,
    updateProfile,
    page404
}