/**
 * Ext Connect Footer Prop Types
 */
export interface IFooter {
  onSubmit: () => Promise<void>
  onCancel: () => Promise<void>
  disabledSubmit?: boolean
  submitLabel: string
  showTrust?: boolean
}
