const express = require('express')

const requireAuthorization = async(req, res, next) => {

    const Store = req.cookies.data

    if (Store === undefined) {
        req.session.message = {
            type: 'danger',
            intro: 'APP SECURITY ',
            message: 'You Must Be Login'
        }
        return res.redirect('/login')
    }

    const { token, user, tasks } = Store

    req.token = token
    req.user = user
    next()
}

module.exports = { requireAuthorization }