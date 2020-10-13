const Invest = require("../models/index").Invest
var slug = require('slug')
const {
    map
} = require('p-iteration');

class ValidateRepository {


    checkIsAliasFree(req, res) {
        // ValidateRepository.checkAliasDelegate(slug, type).then(b => {
        //     return res.json(b)
        // })
    }

    checkIsAliasFreeExcept(req, res) {
        // ValidateRepository.checkAliasDelegateExcept(slug, type, id).then(b => {
        //     return res.json(b)
        // })
    }

    async checkIsArticleTitleChange(nTitle, artId) {
        var art = await Article.findOne({
            where: {
                id: artId
            }
        })

        return nTitle != art.title
    }

    async checkIsAliasFreeStatic(slug, type) {
        return await ValidateRepository.checkAliasDelegate(slug, type);
    }

    async checkIsAliasFreeExceptStatic(slug, type, id) {
        return await ValidateRepository.checkAliasDelegateExcept(slug, type, id);
    }

    static async checkAliasDelegate(alias, type) {
        var bool = true;
        switch (type) {
            case 'invest':
                var bool = await ValidateRepository.checkInvestAlias(alias)
                break;
        }
        return bool;
    }

    static async checkInvestAlias(alias) {
        var cnt = await Invest.count({
            where: {
                slug: alias
            }
        })
        return cnt > 0;
    }


    static async checkAliasDelegateExcept(alias, type, id) {
        var bool = true;
        switch (type) {
            case 'invest':
                var bool = await ValidateRepository.checkInvestAliasEx(alias, id)
                break;

        }
        return bool;
    }


    static async checkInvestAliasEx(alias, id) {
        var cs = await Invest.findAll({
            where: {
                slug: alias
            }
        })

        var fcs = cs.filter(a => a.id != id)

        return fcs.length > 0;
    }


    // static async checkCategoryAliasEx(alias, old, id) {
    //     var cs = await Category.findAll({
    //         where: {
    //             alias: alias
    //         }
    //     })

    //     var fcs = cs.filter(a => a.id != id)

    //     return fcs.length > 0;
    // }





}

module.exports = new ValidateRepository()