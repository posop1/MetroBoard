import fs from 'fs'
import path from 'path'

export const getDataFile = () => {
  const data = fs.readFileSync(path.join(__dirname, '../../data/columnData.json'), 'utf8')
  const column = JSON.parse(data)

  return column
}
