import { randomBytes } from 'crypto'

const randomInt = () => Math.abs(randomBytes(4).readInt32BE())

export default randomInt
