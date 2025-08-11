'use client'

import React from 'react'
import { Button, toast, useTranslation } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import type { DocumentViewServerProps } from 'payload'

import { createQuestionAndAnswer } from './actions/createQuestionAndAnswer'
import type { CustomTranslationsObject, CustomTranslationsKeys } from '../../../custom-translations'

// This component expects to receive the document structure from your form submission
const ClientComponent = ({ doc }: DocumentViewServerProps['doc']) => {
  const router = useRouter()
  const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>()

  const handleCreateDocument = async () => {
    // Extract title and question from submissionData
    const titleField = doc.submissionData.find((item: { field: string }) => item.field === 'title')
    const questionField = doc.submissionData.find(
      (item: { field: string }) => item.field === 'question',
    )

    // Check if we found both fields
    if (!titleField || !questionField) {
      toast.error('Missing required title or question field')
      return
    }

    const title = titleField.value
    const question = questionField.value

    // Use toast.promise to handle the async operation with loading/success/error states
    toast.promise(
      async () => {
        // Call the server action with the extracted values
        const result = await createQuestionAndAnswer({
          title,
          question,
        })

        // After successful creation, redirect to the new document
        setTimeout(() => {
          router.push(`/admin/collections/questionsAndAnswers/${result.id}`)
        }, 500) // Small delay to ensure toast is visible before redirect

        return result
      },
      {
        loading: t('formData:loading'),
        error: (err) => err.message,
      },
    )
  }

  return (
    <Button size="large" onClick={handleCreateDocument}>
      {t('formData:button')}
    </Button>
  )
}

export default ClientComponent
