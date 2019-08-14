import axios from 'axios'
import { api } from './config'

const { uri: proxy }: { uri: string } = api

describe('Companies API asynchronus testing', () => {

  it('Should return companies data', async () => {
    const { data } = await axios.get(`${proxy}/users`)
    expect(data).toBeDefined()
    expect(data instanceof Array).toBe(true)
  })

  it('Should return company data with same ID', async () => {
    try {
      const company_id = 'CPY001'
      const { data } = await axios.get(`${proxy}/companies/${company_id}`)
      expect(data).toBeDefined()
      expect(data instanceof Object).toBe(true)
      expect(data.id).toBe(company_id)
    } catch (err) {
      const { response: { status } } = err
      expect(status).toBe(200)
    }
  })

  it('Should not return any data', async () => {
    try {
      const company_id = 'CPY00111'
      await axios.get(`${proxy}/companies/${company_id}`)
    } catch (err) {
      const { response: { data, status } } = err
      expect(status).toBe(404)
      expect(JSON.stringify(data)).toBe('{}')
    }
  })

})
