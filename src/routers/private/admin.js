const express = require('express')
const { requireAuthorization } = require('../../middleware/requireAuthorization')
const {
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
} = require('../../controller/admin')

const router = express.Router()


router.get('/admin/dashboard', requireAuthorization, dashboard)

router.get('/admin/finance', requireAuthorization, finance)

router.get('/admin/finance/invoice/:id', requireAuthorization, financeInvoice)

router.get('/admin/inbox', requireAuthorization, inbox)

router.get('/admin/notifications', requireAuthorization, notifications)

router.get('/admin/orders', requireAuthorization, orders)

router.get('/admin/orders/details', requireAuthorization, ordersdetails)

router.get('/admin/orders/makeinvoice', requireAuthorization, ordersMakeinvoice)

router.get('/admin/profile', requireAuthorization, profile)

router.get('/admin/settings', requireAuthorization, settings)

router.post('/admin/settings', requireAuthorization, updateProfile)

router.get('/admin/ui-cards', requireAuthorization, uiCards)

router.get('/admin/users', requireAuthorization, users)

router.get('/admin/users/details', requireAuthorization, usersDetails)

module.exports = router