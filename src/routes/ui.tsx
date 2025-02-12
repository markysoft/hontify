import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import { LandingPage } from '../components/landing-page'
import { MainPage } from '../components/main-page'
import config from '../config'


const app = new Hono()

app.get('/', (c) => {
  return c.render(getCookie(c, 'accessToken') ?
    <MainPage refreshInterval={config.spotify.refreshInterval} /> :
    <LandingPage />)
})


export default app