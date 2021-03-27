const express = require('express')
const { signup, signin } = require('../../controller/signup')
const { login, getLogin } = require('../../controller/login')
const {
    index,
    aboutUs,
    howItWorks,
    contactUs,
    moneyBackGuarantee,
    discountPolicy,
    revisionPolicy,
    privacyPolicy,
    termAndCondition,
    congratulations
} = require('../../controller/publicRouters')


const router = express.Router()


router.get('/', index)

router.get('/login', getLogin)

router.post('/login', login)

router.get('/signup', signin)

router.post('/signup', signup)

router.get('/aboutUs', aboutUs)

router.get('/howItWorks', howItWorks)

router.get('/contact', contactUs)

router.get('/moneyBackGuarantee', moneyBackGuarantee)

router.get('/discountPolicy', discountPolicy)

router.get('/revisionPolicy', revisionPolicy)

router.get('/privacyPolicy', privacyPolicy)

router.get('/termsAndConditions', termAndCondition)

router.get('/congratulations', congratulations)



module.exports = router