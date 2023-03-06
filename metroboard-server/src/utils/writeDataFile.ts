import fs from 'fs'
import path from 'path'

export const writeDataFile = (data: any) => {
  fs.writeFileSync(path.join(__dirname, '../../data/columnData.json'), JSON.stringify(data))
}
