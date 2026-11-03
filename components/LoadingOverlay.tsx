"use client"

import { CircleNotch } from "@phosphor-icons/react"

const LoadingOverlay = () => (
  <div className="loading-wrapper" role="status" aria-live="polite">
    <div className="loading-shadow-wrapper bg-[var(--bg-primary)]">
      <div className="loading-shadow">
        <CircleNotch className="loading-animation h-10 w-10 text-[var(--color-brand)]" aria-hidden="true" />
        <p className="loading-title">Preparing your book</p>
      </div>
    </div>
  </div>
)

export default LoadingOverlay
