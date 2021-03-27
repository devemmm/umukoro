const request = require('request')
const { body } = require('express-validator')
const { geneUpdatePayload, generateTime } = require('../helps/generatePayload')


const dashboard = [
    (req, res) => {
        if (!req.user.isAdmin) {
            return res.redirect('/404Page')
        }


        res.render('admin-dashboard', { user: req.user })


    }
]

const finance = [
    (req, res) => {
        if (!req.user.isAdmin) {
            return res.redirect('/404Page')
        }

        try {
            request({
                url: `${process.env.UMUKORO_API}/admin/tasks`,
                method: 'GET',
                headers: {
                    Authorization: req.token
                },
                json: true
            }, (err, response, body) => {

                if (err) {

                    req.session.message = {
                        type: 'danger',
                        intro: 'Server Error: ',
                        message: err.message
                    }

                    return res.redirect('/admin-orders')
                }


                const { error } = body

                if (error) {
                    req.session.message = {
                        type: 'danger',
                        intro: 'Server Error: ',
                        message: error.message
                    }

                    return res.redirect('/admin-dashbord')
                }

                res.render('admin-finance', { user: req.user, task: body })
            })

        } catch (error) {

            req.session.message = {
                type: 'danger',
                intro: 'Server Error: ',
                message: error.message
            }
            return res.redirect('/404Page')
        }

    }
]

// const financeInvoice = [
//     (req, res) => {
//         if (!req.user.isAdmin) {
//             console.log('is not admin')
//             return res.redirect('/404Page')
//         }

//         console.log('is admin')
//         try {
//             // request({
//             //     url: `${process.env.UMUKORO_API}/admin/tasks/${req.params.id}`,
//             //     method: 'GET',
//             //     headers: {
//             //         Authorization: req.token
//             //     },
//             //     json: true
//             // }, (err, response, body) => {

//             //     if (err) {

//             //         req.session.message = {
//             //             type: 'danger',
//             //             intro: 'Server Error: ',
//             //             message: err.message
//             //         }

//             //         return res.redirect('/admin-orders')
//             //     }


//             //     const { error } = body

//             //     if (error) {
//             //         req.session.message = {
//             //             type: 'danger',
//             //             intro: 'Server Error: ',
//             //             message: error.message
//             //         }

//             //         return res.redirect('/admin-dashbord')
//             //     }

//             //     console.log(body)

//             //     res.sendFile('admin-finance/invoice', { user: req.user, task: body, receipt: body.receipt })
//             //         // res.render('admin-finance-invoice', { user: req.user })
//             // })

//             res.redirect('/home', { user: req.user, task: body, receipt: body.receipt })

//         } catch (error) {
//             req.session.message = {
//                 type: 'danger',
//                 intro: 'Server Error: ',
//                 message: error.message
//             }
//             return res.redirect('/404Page')
//         }



//     }
// ]

const financeInvoice = [
    (req, res) => {
        if (!req.user.isAdmin) {
            return res.redirect('/404Page')
        }

        try {

            request({
                url: `${process.env.UMUKORO_API}/admin/tasks/${req.params.id}`,
                method: 'GET',
                headers: {
                    Authorization: req.token
                },
                json: true
            }, (err, response, body) => {

                if (err) {

                    req.session.message = {
                        type: 'danger',
                        intro: 'Server Error: ',
                        message: err.message
                    }

                    return res.redirect('/admin-orders')
                }


                const { error } = body

                if (error) {
                    req.session.message = {
                        type: 'danger',
                        intro: 'Server Error: ',
                        message: error.message
                    }

                    return res.redirect('/admin-dashbord')
                }

                res.render('admin-finance-invoice', { user: req.user, task: body, receipt: body.receipt })
            })

        } catch (error) {
            req.session.message = {
                type: 'danger',
                intro: 'Server Error: ',
                message: error.message
            }
            return res.redirect('/404Page')
        }
    }
]

const inbox = [
    (req, res) => {
        if (!req.user.isAdmin) {
            return res.redirect('/404Page')
        }

        res.render('admin-inbox', { user: req.user })

    }
]

const notifications = [
    (req, res) => {
        if (!req.user.isAdmin) {
            return res.redirect('/404Page')
        }

        res.render('admin-notifications', { user: req.user })

    }
]

const orders = [
    (req, res) => {
        if (!req.user.isAdmin) {
            return res.redirect('/404Page')
        }


        try {
            request({
                url: `${process.env.UMUKORO_API}/admin/tasks`,
                method: 'GET',
                headers: {
                    Authorization: req.token
                },
                json: true
            }, (err, response, body) => {

                if (err) {

                    req.session.message = {
                        type: 'danger',
                        intro: 'Server Error: ',
                        message: err.message
                    }

                    return res.redirect('/admin-orders')
                }


                const { error } = body

                if (error) {
                    req.session.message = {
                        type: 'danger',
                        intro: 'Server Error: ',
                        message: error.message
                    }

                    return res.redirect('/admin-dashbord')
                }


                res.render('admin-orders', { user: req.user, task: body })
            })

        } catch (error) {

            req.session.message = {
                type: 'danger',
                intro: 'Server Error: ',
                message: error.message
            }
            return res.redirect('/404Page')
        }
    }
]


const ordersdetails = [
    (req, res) => {
        if (!req.user.isAdmin) {
            return res.redirect('/404Page')
        }

        res.render('admin-orders-details', { user: req.user })

    }
]


const ordersMakeinvoice = [
    (req, res) => {
        if (!req.user.isAdmin) {
            return res.redirect('/404Page')
        }

        res.render('admin-orders-makeinvoice', { user: req.user })

    }
]



const users = [
    (req, res) => {
        if (!req.user.isAdmin) {
            return res.redirect('/404Page')
        }

        try {

            request({
                url: `${process.env.UMUKORO_API}/admin/users`,
                method: 'GET',
                headers: {
                    Authorization: req.token
                },
                json: true
            }, (err, resonse, body) => {

                if (err) {
                    req.session.message = {
                        type: 'danger',
                        intro: 'Server Error: ',
                        message: err.message
                    }

                    return res.redirect('/admin-orders')
                }

                const { error } = body

                if (error) {
                    req.session.message = {
                        type: 'danger',
                        intro: 'Server Error: ',
                        message: error.message
                    }

                    return res.redirect('/admin-dashbord')
                }




                res.render('admin-users', { user: req.user, users: body })
            })

        } catch (error) {
            return res.redirect('/404Page')
        }

    }
]



const profile = [
    (req, res) => {
        if (!req.user.isAdmin) {
            return res.redirect('/404Page')
        }

        res.render('admin-profile', { user: req.user })

    }
]


const uiCards = [
    (req, res) => {
        if (!req.user.isAdmin) {
            return res.redirect('/404Page')
        }

        res.render('admin-ui-cards', { user: req.user })

    }
]



const settings = [
    (req, res) => {
        if (!req.user.isAdmin) {
            return res.redirect('/404Page')
        }

        res.render('admin-settings', { user: req.user })

    }
]


const updateProfile = [
    (req, res) => {
        if (!req.user.isAdmin) {
            return res.redirect('/404Page')
        }

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
                res.redirect('/admin/dashboard')
            })

        } catch (error) {
            return res.res.redirect('/404Page')
        }

    }

]



const usersDetails = [
    (req, res) => {
        if (!req.user.isAdmin) {
            return res.redirect('/404Page')
        }

        res.render('admin-users-details', { user: req.user })

    }
]


module.exports = {
    dashboard,
    finance,
    financeInvoice,
    inbox,
    notifications,
    orders,
    ordersdetails,
    ordersMakeinvoice,
    users,
    profile,
    uiCards,
    settings,
    updateProfile,
    usersDetails
}