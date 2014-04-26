var Bookshelf = require('bookshelf').PG;

module.exports = function() {
    var bookshelf = {};

    bookshelf.ApiUser = Bookshelf.Model.extend({
        tableName: 'public.users'
    });

    return bookshelf;
}
