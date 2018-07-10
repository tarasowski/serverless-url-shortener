module.exports.urlPath = (event) => {
    if (!event || !event.pathParameters) {
        return ''
    }
    return event.pathParameters.urlPath
}

module.exports.longUrl = (event) => {
    if (!event) {
        return ''
    }

    return JSON.parse(event.body).url
}
