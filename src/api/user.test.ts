import axios from 'axios'
import { api } from './config'

const { uri: proxy }: { uri: string } = api

describe('User\'s API asynchronus testing', () => {

  it('Should return users data', async () => {
    const { data } = await axios.get(`${proxy}/users`)
    expect(data).toBeDefined()
    expect(data instanceof Array).toBe(true)
  })

  it('Should return user data with same ID', async () => {
    try {
      const user_id = 'USR001'
      const { data } = await axios.get(`${proxy}/users/${user_id}`)
      expect(data).toBeDefined()
      expect(data instanceof Object).toBe(true)
      expect(data.id).toBe(user_id)
    } catch (err) {
      const { response: { status } } = err
      expect(status).toBe(200)
    }
  })

  it('Should not return any data', async () => {
    try {
      const user_id = 'USR00111'
      await axios.get(`${proxy}/users/${user_id}`)
    } catch (err) {
      const { response: { data, status } } = err
      expect(status).toBe(404)
      expect(JSON.stringify(data)).toBe('{}')
    }
  })

})
