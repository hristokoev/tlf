import React from 'react'
import type { DocumentViewServerProps } from 'payload'
import { Gutter, SetStepNav } from '@payloadcms/ui'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { TFunction } from '@payloadcms/translations'

import ClientComponent from './client'
import { CustomTranslationsKeys } from '../../../custom-translations'

const FormSubmissionView = async (props: DocumentViewServerProps) => {
  const {
    doc,
    i18n: { t: rawT },
  } = props
  const submissionData = doc.submissionData || []
  const createdAt = new Date(doc.createdAt).toLocaleString()

  const payload = await getPayload({ config: configPromise })
  const formDoc = await payload.findByID({
    collection: 'forms',
    id: doc.form,
  })

  const t = rawT as TFunction<CustomTranslationsKeys>

  return (
    <div className="bg-body min-h-screen text-primary">
      <SetStepNav
        nav={[
          {
            label: {
              en: 'Form Submissions',
              cs: 'Přijaté zprávy',
            },
            url: '/admin/collections/form-submissions',
          },
          {
            label: {
              en: `Submission by ${doc.submissionData?.[0]?.value}` || 'Submission Details',
              cs:
                `Přijatý formulář od ${doc.submissionData?.[0]?.value}` || 'Detaily přijaté zprávy',
            },
            url: `/admin/collections/form-submissions/${doc.id}`,
          },
        ]}
      />
      <Gutter>
        <div className="py-6">
          <h1 className="mb-6 text-2xl font-medium">{t('formData:h1')}</h1>

          <div className="space-y-8">
            {/* Submission Information */}
            <div className="border-card bg-card shadow-base-950 overflow-hidden rounded-md border">
              <div className="border-card bg-card-header border-b px-6 py-4">
                <h2 className="text-lg font-medium">{t('formData:submissionInformation')}</h2>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-secondary">
                      {t('formData:createdAt')}
                    </label>
                    <div className="border-input bg-input rounded-md border px-4 py-2">
                      {createdAt}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-secondary">
                      {t('formData:form')}
                    </label>
                    <div className="border-input bg-input truncate rounded-md border px-4 py-2 font-mono text-sm">
                      {formDoc.title}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-secondary">
                      {t('formData:submissionId')}
                    </label>
                    <div className="border-input bg-input truncate rounded-md border px-4 py-2 font-mono text-sm">
                      {doc.id}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Data */}
            <div className="border-card bg-card shadow-base-950 overflow-hidden rounded-md border">
              <div className="border-card bg-card-header border-b px-6 py-4">
                <h2 className="text-lg font-medium">{t('formData:formData')}</h2>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {submissionData.map((field = { id: '', field: '', value: '' }) => (
                    <div key={field.id}>
                      <label className="mb-1 block text-sm font-medium text-secondary">
                        {t(`formData:${field.field}` as CustomTranslationsKeys) ||
                          t('formData:formData')}
                      </label>
                      <div className="border-input bg-input rounded-md border px-4 py-2">
                        {typeof field.value === 'string' && field.value.includes('\n')
                          ? field.value.split('\n').map((line, i) => (
                              <React.Fragment key={i}>
                                {line}
                                {i < field.value.split('\n').length - 1 && <br />}
                              </React.Fragment>
                            ))
                          : field.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Button */}
            {formDoc.title === 'ama' && <ClientComponent doc={doc} />}
          </div>
        </div>
      </Gutter>
    </div>
  )
}

export default FormSubmissionView
