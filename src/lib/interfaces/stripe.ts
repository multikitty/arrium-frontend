export interface FetchInvoicesByAdminVariables {
  pk: string
  sk: string
  page?: number
  limit?: number
  end_before?: string
  start_after?: string
}

export type InvoicePaidStatus = "paid" | "due" | "overdue"

export interface FetchInvoicesByAdminDataInvoicesData {
  id: string
  invoice_no: string
  stripe_id: string
  // To be used as Plan type
  description: string
  amount_due: number
  due_date: string | null
  paid_at: string | null
  invoice_url: string
  paid_status: InvoicePaidStatus
  period_start: string
  period_end: string | null
}

export interface FetchInvoicesByAdminDataInvoices {
  object: string
  data: [
    {
      id: string
      object: string
      account_country: string
      account_name: string
      account_tax_ids: string | null
      amount_due: number
      amount_paid: number
      amount_remaining: number
      application: string | null
      application_fee_amount: number | null
      attempt_count: number
      attempted: boolean
      auto_advance: boolean
      automatic_tax: {
        enabled: boolean
        status: string | null
      }
      billing_reason: string
      charge: number | null
      collection_method: string
      created: number
      currency: string
      custom_fields: string | null
      customer: string
      customer_address: string | null
      customer_email: string
      customer_name: string
      customer_phone: string | null
      customer_shipping: string | null
      customer_tax_exempt: string
      customer_tax_ids: string[]
      default_payment_method: string | null
      default_source: string | null
      default_tax_rates: string[]
      description: string | null
      discount: number | null
      discounts: string[]
      due_date: string | null
      ending_balance: number
      footer: string | null
      from_invoice: string | null
      hosted_invoice_url: string
      invoice_pdf: string
      last_finalization_error: string | null
      latest_revision: string | null
      lines: {
        object: string
        data: [
          {
            id: string
            object: string
            amount: number
            amount_excluding_tax: number
            currency: string
            description: string
            discount_amounts: string[]
            discountable: boolean
            discounts: string[]
            livemode: boolean
            metadata: {
              is_free_trial: string
            }
            period: {
              end: number
              start: number
            }
            plan: {
              id: string
              object: string
              active: boolean
              aggregate_usage: string | null
              amount: number
              amount_decimal: string
              billing_scheme: string
              created: number
              currency: string
              interval: string
              interval_count: number
              livemode: boolean
              metadata: {
                name: string
                "plan type": string
              }
              nickname: string | null
              product: string
              tiers_mode: string | null
              transform_usage: string | null
              trial_period_days: string | null
              usage_type: string
            }
            price: {
              id: string
              object: string
              active: boolean
              billing_scheme: string
              created: number
              currency: string
              custom_unit_amount: number | null
              livemode: boolean
              lookup_key: string | null
              metadata: {
                name: string
                "plan type": string
              }
              nickname: string | null
              product: string
              recurring: {
                aggregate_usage: string | null
                interval: string
                interval_count: number
                trial_period_days: number | null
                usage_type: string
              }
              tax_behavior: string
              tiers_mode: string | null
              transform_quantity: number | null
              type: string
              unit_amount: number
              unit_amount_decimal: string
            }
            proration: boolean
            proration_details: {
              credited_items: string[] | null
            }
            quantity: number
            subscription: string
            subscription_item: string
            tax_amounts: string[]
            tax_rates: string[]
            type: string
            unit_amount_excluding_tax: string
          }
        ]
        has_more: boolean
        total_count: number
        url: string
      }
      livemode: boolean
      metadata: null
      next_payment_attempt: null
      number: string
      on_behalf_of: string | null
      paid: boolean
      paid_out_of_band: boolean
      payment_intent: string | null
      payment_settings: {
        default_mandate: string | null
        payment_method_options: string | null
        payment_method_types: string | null
      }
      period_end: number | null
      period_start: number | null
      post_payment_credit_notes_amount: number
      pre_payment_credit_notes_amount: number
      quote: string | null
      receipt_number: string | null
      rendering_options: string | null
      starting_balance: number
      statement_descriptor: string | null
      status: InvoicePaidStatus
      status_transitions: {
        finalized_at: number
        marked_uncollectible_at: number | null
        paid_at: number
        voided_at: number | null
      }
      subscription: string
      subtotal: number
      subtotal_excluding_tax: number
      tax: string | null
      test_clock: string | null
      total: number
      total_discount_amounts: string[]
      total_excluding_tax: number
      total_tax_amounts: string[]
      transfer_data: string | null
      webhooks_delivered_at: string | null
    }
  ]
  has_more: boolean
  url: string
}

export interface FetchInvoicesByAdminData {
  invoices_data: FetchInvoicesByAdminDataInvoicesData[]
  has_more: boolean
  invoices: FetchInvoicesByAdminDataInvoices
}

export interface FetchInvoicesByAdminResult {
  success: boolean
  message: string
  invoices: FetchInvoicesByAdminData
}

export interface FetchInvoicesByDriverVariables {
  page?: number
  limit?: number
  end_before?: string
  start_after?: string
}

export interface FetchInvoicesByDriverData {
  id: string
  invoice_no: string
  stripe_id: string
  description: string
  amount_due: number
  due_date: string
  paid_at: string | null
  invoice_url: string
  paid_status: InvoicePaidStatus
  period_start: string
  period_end: string
}

export interface FetchInvoicesByDriverResult {
  success: boolean
  message: string
  data: Array<FetchInvoicesByDriverData>
  has_more: boolean
  starting_after: string | null
  ending_before: string | null
}

export interface IFetchInvoicesByDriverVariables {
  page?: number
  limit?: number
  end_before?: string
  start_after?: string
}

export interface IFetchInvoicesByDriverData {
  id: string
  invoice_no: string
  stripe_id: string
  description: string
  amount_due: number
  due_date: string
  paid_at: string | null
  invoice_url: string
  paid_status: InvoicePaidStatus
  period_start: string
  period_end: string
}

export interface IFetchInvoicesByDriverResult {
  success: boolean
  message: string
  data: Array<IFetchInvoicesByDriverData>
  has_more: boolean
  starting_after: string | null
  ending_before: string | null
}
