const express = require('express')
const passport = require('passport')
const router = express.Router()
const Profile = require('../../moudels/Profile')
const keys = require('../../config/keys')


router.get('/test', (req, res) => {
    res.json({ msg: "success" })
})


//配置添加接口
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields = {}
    if (req.body.type) profileFields.type = req.body.type
    if (req.body.describe) profileFields.describe = req.body.describe
    if (req.body.income) profileFields.income = req.body.income
    if (req.body.expent) profileFields.expent = req.body.expent
    if (req.body.cash) profileFields.cash = req.body.cash
    if (req.body.remark) profileFields.remark = req.body.remark

    new Profile(profileFields).save().then(profile => {
        res.json(profile)
    })
})

//配置获取所有信息接口
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.find()
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容")
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

//配置获取单个信息接口
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ _id: req.params.id })
        .then(profile => {
            if (!profile) {
                return res.status(404).json("没有任何内容")
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})
//编辑信息接口
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields = {}
    if (req.body.type) profileFields.type = req.body.type
    if (req.body.describe) profileFields.describe = req.body.describe
    if (req.body.income) profileFields.income = req.body.income
    if (req.body.expent) profileFields.expent = req.body.expent
    if (req.body.cash) profileFields.cash = req.body.cash
    if (req.body.remark) profileFields.remark = req.body.remark

    Profile.findOneAndUpdate(
        { _id: req.params.id },
        { $set: profileFields },
        { new: true }
    ).then(profile => res.json(profile))
})


//配置删除接口
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findByIdAndRemove({ _id: req.params.id })
        .then(profile => {
            profile.save().then(profile => res.json(profile))
        })
        .catch(err => res.status(404).json("删除失败！"))
})
module.exports = router