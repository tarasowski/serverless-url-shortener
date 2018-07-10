# Headless Serverless Url Shortener Service (Alpha)

Thanks to @danielireson for his [tutorial](https://medium.freecodecamp.org/how-to-build-a-serverless-url-shortener-using-aws-lambda-and-s3-4fbdf70cbf5c)

Disclaimer: You can find here a simple version of URL shortener service. The main idea is that the data is stored not in a database but in an object storage S3. The information is written to the metadata of the object, which is a nice way to use some features that are not intended to be used in that way ;-)

1. Clone the repo `git clone`
2. Open package.json and change the name of the s3 bucket you want to upload your AWS SAM artifacts to
3. Crate Cloudformation Stack `npm run qd`
4. Send http POST request to your API endpoint with body `{"url": "http://url-you-want-to-shorten.com"}`
5. Send http GET request to /{urlPath} e.g. `/q3HWQ67`
6. Receive your original URL
7. Have fun

