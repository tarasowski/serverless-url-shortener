const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const parse = require('./parse-incoming-request').longUrl
const processResponse = require('./process-response').newShortUrl

const BUCKET_NAME = process.env.BUCKET_NAME

exports.handler = (event, context, callback) => {

    const longUrl = parse(event)

    validate(longUrl)
        .then(() => getPath())
        .then(path => {
            const redirect = buildRedirect(path, longUrl)
            return saveRedirect(redirect)
        })
        .then(path => {
            const response = processResponse(200, 'Successfully shortened url', path)
            callback(null, response)
        })
        .catch(err => {
            const response = processResponse(400, 'Something went wrong, please try again')
            console.log(err)
            callback(null, response)
        })


}

const validate = (longUrl) => {
    if (longUrl === '') {
        return Promise.reject({
            statusCode: 400,
            message: 'Url is required'
        })
    }
    return Promise.resolve(longUrl)
}

const getPath = () => {
    return new Promise((resolve, reject) => {
        let path = generatePath()
        resolve(path)
    })
}

const generatePath = (path = '') => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const position = Math.floor(Math.random() * characters.length)
    const character = characters.charAt(position)

    if (path.length === 7) {
        return path
    }

    return generatePath(path + character)
}

const buildRedirect = (path, longUrl = false) => {
    const redirect = {
        'Bucket': BUCKET_NAME,
        'Key': path
    }
    if (longUrl) {
        redirect['WebsiteRedirectLocation'] = longUrl
    }

    return redirect
}

const saveRedirect = (redirect) => {
    return s3.putObject(redirect).promise()
        .then(() => Promise.resolve(redirect['Key']))
}
