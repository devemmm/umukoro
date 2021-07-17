const express = require('express')
const request = require('request')
const { requireAuthorization } = require('../../middleware/requireAuthorization')
const {
    home,
    inbox,
    invoice,
    logout,
    page404,
    settings,
    profile,
    tasks,
    postNewTasks,
    deleteTask,
    updateProfile,
    getNewTasks,
    documents,
    description,
    notifications
} = require('../../controller/user')

const router = express.Router()


router.get('/home', requireAuthorization, home)

router.get('/inbox', requireAuthorization, inbox)

router.get('/invoice', requireAuthorization, invoice)

router.get('/tasks', requireAuthorization, tasks)

router.get('/newTasks', requireAuthorization, getNewTasks)

router.post('/newTasks', requireAuthorization, postNewTasks)

router.get('/task/:id', requireAuthorization, deleteTask)

router.get('/notifications', requireAuthorization, notifications)

router.get('/documents', requireAuthorization, documents)


router.get('/details', requireAuthorization, description)


router.get('/profile', requireAuthorization, profile)

router.get('/settings', requireAuthorization, settings)

router.post('/settings', requireAuthorization, updateProfile)

router.get('/logout', requireAuthorization, logout)

router.post('/helpajax/id=:id', (req,res)=>{

    try {
        request({
            url: `${process.env.UMUKORO_API}/ajaxdeletetask/id=`+req.params.id,
            method: 'POST',
            headers: {
                Authorization: req.token
            },
            json: true
        }, (err, response, body) => {

            
        })
    } catch (error) {
        // return res.redirect('/404Page')
    }
    res.send({id:req.params.id});
})


router.get('*', page404)


module.exports = router