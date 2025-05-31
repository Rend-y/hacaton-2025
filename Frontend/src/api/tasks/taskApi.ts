import type { TaskRequest } from './types'
import data from './data.json'

/**
 * @swagger
 * /api/task-requests:
 *   get:
 *     summary: Get all task requests
 *     description: Retrieves all task requests sorted by creation date (newest first)
 *     responses:
 *       200:
 *         description: A list of task requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskRequest'
 */
export async function fetchTaskRequests(): Promise<TaskRequest[]> {
  return data.requests.sort((a, b) => b.createdAt - a.createdAt)
}

/**
 * @swagger
 * /api/task-requests:
 *   post:
 *     summary: Create a new task request
 *     description: Creates a new task request and adds it to the beginning of the list
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTaskRequest'
 *     responses:
 *       201:
 *         description: The created task request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskRequest'
 */
export async function createTaskRequest(request: Omit<TaskRequest, 'id' | 'status' | 'createdAt'>): Promise<TaskRequest> {
  const newRequest: TaskRequest = {
    id: Date.now(),
    status: 'new',
    createdAt: Date.now(),
    ...request
  }
  
  data.requests.unshift(newRequest)
  return newRequest
}

/**
 * @swagger
 * /api/task-requests/{id}:
 *   put:
 *     summary: Update a task request
 *     description: Updates an existing task request by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskRequest'
 *     responses:
 *       200:
 *         description: The updated task request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskRequest'
 */
export async function updateTaskRequest(id: number, request: TaskRequest): Promise<TaskRequest> {
  const index = data.requests.findIndex(r => r.id === id)
  if (index === -1) {
    throw new Error('Task request not found')
  }
  
  data.requests[index] = request
  return request
}

/**
 * @swagger
 * components:
 *   schemas:
 *     TaskRequest:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - status
 *         - createdAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The task request ID
 *         title:
 *           type: string
 *           description: Title of the project
 *         preview:
 *           type: string
 *           description: Short preview of the project
 *         description:
 *           type: string
 *           description: Detailed description of the project
 *         status:
 *           type: string
 *           enum: [new, in_progress, pending, completed]
 *           description: Current status of the request
 *         createdAt:
 *           type: integer
 *           format: int64
 *           description: Timestamp when the request was created
 *     NewTaskRequest:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *         preview:
 *           type: string
 *         description:
 *           type: string
 */ 