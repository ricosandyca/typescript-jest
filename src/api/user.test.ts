import axios from 'axios'
import { api } from './config'

const { uri: proxy }: { uri: string } = api

interface IUser {
  id?: string
  name: string
  age: number
}

describe('User\'s API asynchronus testing', () => {

  it('Should return users data', async () => {
    const { data } = await axios.get(`${proxy}/users`)
    expect(data).toBeDefined()
    expect(data instanceof Array).toBeTruthy()
  })

  it('Should return user data with same ID', async () => {
    try {
      const user_id = 'USR001'
      const { data } = await axios.get(`${proxy}/users/${user_id}`)
      expect(data).toBeDefined()
      expect(data instanceof Object).toBeTruthy()
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

  it('Should add new user data', async () => {
    try {
      const new_user: IUser = {
        name: 'Rico Sandyca Novenza',
        age: 20
      }
      const { data } = await axios.post(`${proxy}/users`, new_user)
      expect(data).toBeDefined()
      expect(data instanceof Object).toBeTruthy()
      expect(data.name === new_user.name && data.age === new_user.age).toBe(true)
    } catch (err) {
      const { response: { status } } = err
      expect(status).toBe(200)
    }
  })

  it('Should update user data', async () => {
    try {
      const { data: users } = await axios.get(`${proxy}/users`)
      const target_user = users[users.length - 1]
      const update_user: IUser = {
        name: 'Rico Sandyca Updated',
        age: 21
      }
      const { data } = await axios.put(`${proxy}/users/${target_user.id}`, update_user)
      expect(data).toBeDefined()
      expect(data instanceof Object).toBeTruthy()
      expect(data.name === update_user.name && data.age === update_user.age).toBe(true)
    } catch (err) {
      const { response: { status } } = err
      expect(status).toBe(200)
    }
  })

  it('Should delete last user in lists', async () => {
    try {
      const { data: users } = await axios.get(`${proxy}/users`)
      const target_user = users[users.length - 1]
      const { data } = await axios.delete(`${proxy}/users/${target_user.id}`)
      expect(data).toBeDefined()
      expect(data instanceof Object).toBeTruthy()
      expect(JSON.stringify(data)).toBe('{}')
    } catch (err) {
      const { response: { status } } = err
      expect(status).toBe(200)
    }
  })

})
