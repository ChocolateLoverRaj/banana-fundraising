import SparkPost from 'sparkpost'

const client = new SparkPost(process.env.SPARKPOST_KEY)

export default client
