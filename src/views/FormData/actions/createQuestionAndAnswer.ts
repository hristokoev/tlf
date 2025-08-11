'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const createQuestionAndAnswer = async (data: { title: string; question: string }) => {
  const payload = await getPayload({
    config: configPromise,
  })
  const { title, question } = data

  try {
    const questionDoc = await payload.create({
      collection: 'questionsAndAnswers',
      data: {
        title,
        question,
      },
      depth: 0,
    })

    if (!questionDoc) {
      console.error('Error creating question document: Document not found.')
      throw new Error('Failed to create question')
    }

    return questionDoc
  } catch (error) {
    console.error('Error creating question document:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to create question')
  }
}
