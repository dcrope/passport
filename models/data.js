var Bookshelf = require('bookshelf').PG;

module.exports = function() {
    var bookshelf = {};

    bookshelf.user = Bookshelf.Model.extend({
        tableName: 'public.users'
    });
    bookshelf.skill = Bookshelf.Model.extend({
        tableName: 'public.skill_list'
    });
    bookshelf.userToSkill = Bookshelf.Model.extend({
        tableName: 'public.user_to_skill'
    });
    bookshelf.userLevel = Bookshelf.Model.extend({
        tableName: 'public.user_level'
    });
    bookshelf.skillRequirements = Bookshelf.Model.extend({
        tableName: 'public.skill_req'
    });
    bookshelf.userSkill = Bookshelf.Model.extend({
        tableName: 'public.user_skills'
    });
    bookshelf.userSkills = Bookshelf.Collection.extend({
        model: bookshelf.userSkill
    })

    return bookshelf;
}
