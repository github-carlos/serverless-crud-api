import { APIGatewayEvent } from 'aws-lambda'
import { createJobsController } from '../../infra/factories/jobs.factory'
import { CreateJobDTO } from '../../data/use-cases/create-job/create-job.usecase'
import { JobDTO } from '../../core/entities/job.entity'
import { handleError } from './error-handler'
import { extractBody, extractPathParams } from './utils'

const jobsController = createJobsController()

export async function create(event: APIGatewayEvent) {
  try {
    const body = extractBody(event) as CreateJobDTO
    await jobsController.create(body)

    return {
      statusCode: 201,
    }
  } catch (err) {
    return handleError(err)
  }
}

export async function getJob(event: APIGatewayEvent) {
  try {
    const { id } = extractPathParams(event) as { id: string }
    const job = await jobsController.getJob(id)
    return {
      statusCode: 200,
      body: JSON.stringify(job),
    }
  } catch (err) {
    return handleError(err)
  }
}

export async function list() {
  try {
    const jobs = await jobsController.list()

    return Promise.resolve({
      statusCode: 200,
      body: JSON.stringify(jobs),
    })
  } catch (err) {
    return handleError(err)
  }
}

export async function updateJob(event: APIGatewayEvent) {
  try {
    const { id } = extractPathParams(event) as { id: string }
    const data = extractBody(event) as Partial<JobDTO>

    await jobsController.updateJob({ id, data })

    return Promise.resolve({
      statusCode: 204,
    })
  } catch (err) {
    return handleError(err)
  }
}

export async function deleteJob(event: APIGatewayEvent) {
  try {
    const { id } = extractPathParams(event) as { id: string }

    await jobsController.delete(id)

    return Promise.resolve({
      statusCode: 204,
    })
  } catch (err) {
    return handleError(err)
  }
}
