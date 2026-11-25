import { useState } from 'react'
import { Ban } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { TextareaField } from './RequestShared'

export default function CancelDialog({ request, onConfirm, onClose }) {
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    onConfirm(request.id, reason)
    setLoading(false)
    onClose()
  }

  return (
    <Modal
      open={!!request}
      onClose={onClose}
      title="Cancel Request"
      description={`Are you sure you want to cancel ${request?.id}? This action will mark the request as Cancelled.`}
      size="sm"
      closeOnOverlay={!loading}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
            Keep Request
          </Button>
          <Button
            variant="danger"
            size="sm"
            loading={loading}
            iconLeft={<Ban size={13} />}
            onClick={handleConfirm}
          >
            Confirm Cancellation
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-100">
          <Ban size={16} className="text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-red-700">{request?.title}</p>
            <p className="text-[11px] text-red-500 mt-0.5">Status will be changed to Cancelled.</p>
          </div>
        </div>
        <TextareaField
          id="cancel-reason"
          label="Reason for cancellation"
          value={reason}
          onChange={e => setReason(e.target.value)}
          placeholder="Optionally explain why this request is being cancelled…"
          rows={3}
        />
      </div>
    </Modal>
  )
}
