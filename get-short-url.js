const AWS = require('aws-sdk')
const s3 = new AWS.S3()
const parse = require('./parse-incoming-request').urlPath
const processResponse = require('./process-response').originalLongUrl

const BUCKET_NAME = process.env.BUCKET_NAME

exports.handler = (event, context, callback) => {

    const urlPath = parse(event)

    validate(urlPath)
        .then(retrieveRedirectUrl)
        .then(data => {
            return data.WebsiteRedirectLocation
        })
        .then(longUrl => {
            const response = processResponse(200, 'Successfully retrieved long Url', longUrl)
            callback(null, response)
        })
        .catch(err => {
            const response = processResponse(400, 'Something went wrong')
            console.log(err.stack)
        })

}


const validate = (urlPath) => {
    if (urlPath === '') {
        return Promise.reject({
            statusCode: 400,
            message: 'Url Path is required'
        })
    }
    return Promise.resolve(urlPath)
}

const retrieveRedirectUrl = (urlPath) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: urlPath
    }
    return s3.headObject(params).promise()
}
