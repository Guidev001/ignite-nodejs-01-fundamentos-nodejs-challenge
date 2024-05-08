import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';
import Export from '../streams/import-csv.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const users = database.select('tasks', search ? {
        title: search || '',
        description: search || ''
      } : null)

      return res.end(JSON.stringify(users))
    },
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks/import'),
    handler: (req, res) => {
      Export()
      return res.end()
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if (!title || !description) return res.writeHead(400).end('Não foi possível criar uma nova Task, campos não foram preenchidos!')

      const task = {
        id: randomUUID(),
        title: title,
        description: description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const task = database.findOne('tasks', id)

      if (!task) return res.writeHead(404).end('Task não existente!')

      task.completed_at = new Date()

      database.update('tasks', id, task)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (!title || !description) return res.writeHead(400).end('Não foi possível criar uma nova Task, campos não foram preenchidos!')

      const task = database.findOne('tasks', id)

      if (!task) return res.writeHead(404).end('Task não existente!')

      task.updated_at = new Date()

      if (title) task.title = title
      if (description) task.description = description

      database.update('tasks', id, task)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const task = database.findOne('tasks', id)

      if (!task) return res.writeHead(404).end('Task não existente!')

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  }
];
