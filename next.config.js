/**
 * Created by Igor on 12/13/2018.
 */
// const compose = require('next-compose')
const withCSS = require('@zeit/next-css')

/*
module.exports = compose([
    [withCSS()],
    {
        exportPathMap: function () {
            return {
                '/': {page: '/'}
            }
        }
    }
])*/


module.exports = withCSS()

/*module.exports = {
    exportPathMap: function () {
        return {
            '/': { page: '/' }
        }
    }
};*/
