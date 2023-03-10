import fs from 'fs'
import path from 'path'

export const writeDataFile = (data: any, type: 'task' | 'column') => {
  if (type === 'column') {
    fs.writeFileSync(path.join(__dirname, '../../data/columnData.json'), JSON.stringify(data))
  } else if (type === 'task') {
    fs.writeFileSync(path.join(__dirname, '../../data/taskData.json'), JSON.stringify(data))
  }
}
