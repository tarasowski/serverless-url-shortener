const BUCKET_NAME = process.env.BUCKET_NAME
const REGION = process.env.REGION

module.exports.originalLongUrl = (statusCode, message, longUrl = false) => {
    const body = { message }
    if (longUrl) {
        body['longUrl'] = longUrl
    }

    return {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        statusCode,
        body: JSON.stringify(body)
    }
}


module.exports.newShortUrl = (statusCode, message, path = false) => {
    const body = { message }
    if (path) {
        body['path'] = path
        body['url'] = buildRedirectUrl(path)
    }
    return {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        statusCode,
        body: JSON.stringify(body)
    }
}

const buildRedirectUrl = (path) => {
    const baseUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/`
    return baseUrl + path
}
