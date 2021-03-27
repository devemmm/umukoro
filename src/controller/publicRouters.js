const express = require('express')

exports.index = [
    (req, res) => {
        res.render('index')
    }
]

exports.aboutUs = [
    (req, res) => {
        res.render('aboutUs')
    }
]

exports.howItWorks = [
    (req, res) => {
        res.render('howItWorks')
    }
]


exports.contactUs = [
    (req, res) => {
        res.render('contact')
    }
]


exports.moneyBackGuarantee = [
    (req, res) => {
        res.render('moneyBackGuarantee')
    }
]

exports.discountPolicy = [
    (req, res) => {
        res.render('discountPolicy')
    }
]

exports.revisionPolicy = [
    (req, res) => {
        res.render('revisionPolicy')
    }
]

exports.privacyPolicy = [
    (req, res) => {
        res.render('privacyPolicy')
    }
]

exports.termAndCondition = [
    (req, res) => {
        res.render('termsAndConditions')
    }
]

exports.congratulations = [
    (req, res) => {
        res.render('congratulations')
    }
]