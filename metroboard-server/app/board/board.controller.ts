import { Request, Response } from 'express'
import { Board } from './board.model'
import { User } from '../user'
import { Column } from '../column'
import { Task } from '../task'

export const createBoard = async (req: Request, res: Response) => {
  try {
    const { title } = req.body
    const userId = req.headers.userId

    const newBoard = new Board({
      title
    })

    await newBoard.save()

    await User.findByIdAndUpdate(userId, {
      $push: { boards: newBoard }
    })

    res.json(newBoard)
  } catch (error) {
    console.log('create board error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const getBoards = async (req: Request, res: Response) => {
  try {
    const userId = req.headers.userId

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'user not found' })
    }

    const list = await Promise.all(
      user.boards.map((board) => {
        return Board.findById(board)
      })
    )

    res.json(list)
  } catch (error) {
    console.log('get boards error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const getBoardById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const board = await Board.findById(id)
    if (!board) {
      return res.status(404).json({ message: 'board not found' })
    }

    res.json(board)
  } catch (error) {
    console.log('get board by id error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const updateBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title } = req.body

    const board = await Board.findById(id)
    if (!board) {
      return res.status(404).json({ message: 'board not found' })
    }

    board.title = title
    await board.save()

    res.json(board)
  } catch (error) {
    console.log('update error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const removeBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.headers.userId

    const board = await Board.findByIdAndRemove(id)
    if (!board) {
      return res.status(404).json({ message: 'board not found' })
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { boards: board._id }
    })

    res.json({ message: 'remove success' })
  } catch (error) {
    console.log('remove error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const getColumnsByBoardId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const board = await Board.findById(id)
    if (!board) {
      return res.status(404).json({ message: 'board not found' })
    }

    const list = await Promise.all(
      board.columns.map((column) => {
        return Column.findById(column)
      })
    )

    res.json(list)
  } catch (error) {
    console.log('get board columns error', error)
    res.status(400).json({ message: 'error' })
  }
}

export const getTasksByBoardId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const board = await Board.findById(id)
    if (!board) {
      return res.status(404).json({ message: 'board not found' })
    }

    const list = await Promise.all(
      board.tasks.map((task) => {
        return Task.findById(task)
      })
    )

    res.json(list)
  } catch (error) {
    console.log('get tasks by board id error', error)
    res.status(400).json({ message: 'error' })
  }
}
