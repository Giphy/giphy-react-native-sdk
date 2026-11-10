import fs from 'fs'
import https from 'https'
import path from 'path'

const ENV_PATH = path.resolve(__dirname, '../../example/.env')
const REQUEST_TIMEOUT = 20_000

function readApiKey() {
  const name = device.getPlatform() === 'ios' ? 'IOS_GIPHY_API_KEY' : 'ANDROID_GIPHY_API_KEY'
  const env = fs.readFileSync(ENV_PATH, 'utf8')
  const line = env.split('\n').find((l) => l.trim().startsWith(`${name}=`))
  const key = line
    ?.slice(line.indexOf('=') + 1)
    .trim()
    .replace(/^(['"])(.*)\1$/, '$2')
  if (!key) {
    throw new Error(`${name} is not set in example/.env`)
  }
  return key
}

function getJson(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { timeout: REQUEST_TIMEOUT }, (response) => {
      let body = ''
      response.setEncoding('utf8')
      response.on('data', (chunk) => (body += chunk))
      response.on('end', () => {
        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}`))
          return
        }
        try {
          resolve(JSON.parse(body))
        } catch (e) {
          reject(e)
        }
      })
    })
    request.on('timeout', () => request.destroy(new Error(`Timed out after ${REQUEST_TIMEOUT} ms`)))
    request.on('error', reject)
  })
}

/*
 * Fetches the ID of the first trending item, so tests don't depend on one item staying online.
 */
export async function fetchTrendingId(type: 'clips' | 'stickers'): Promise<string> {
  const url = `https://api.giphy.com/v1/${type}/trending?api_key=${readApiKey()}&limit=1&rating=g`
  let body: { data?: { id: string }[] }
  try {
    body = await getJson(url)
  } catch (e: any) {
    throw new Error(`Trending ${type} request failed: ${e.message}`)
  }
  const id = body.data?.[0]?.id
  if (!id) {
    throw new Error(`No trending ${type} returned`)
  }
  return id
}
