/**
 * Created by Igor on 12/13/2018.
 */
/*
const withCSS = require('@zeit/next-css')
module.exports = withCSS()*/

module.exports = {
    exportPathMap: function () {
        return {
            '/': { page: '/' }
        }
    }
};
