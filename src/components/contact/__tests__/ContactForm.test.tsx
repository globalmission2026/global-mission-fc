import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockInsert = vi.fn()

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: () => ({
      insert: mockInsert,
    }),
  },
}))

import ContactPage from '@/app/contact/page'

describe('ContactPage', () => {
  beforeEach(() => {
    mockInsert.mockReset()
  })

  it('renders contact info cards', () => {
    render(<ContactPage />)
    expect(screen.getByText('Reach Out to Us')).toBeInTheDocument()
    expect(screen.getByText('Phone')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Follow Us')).toBeInTheDocument()
  })

  it('renders form fields', () => {
    render(<ContactPage />)
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Subject')).toBeInTheDocument()
    expect(screen.getByLabelText('Your Message')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<ContactPage />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows success message after form submission', async () => {
    mockInsert.mockResolvedValue({ error: null })
    render(<ContactPage />)

    await userEvent.type(screen.getByLabelText('Full Name'), 'John Doe')
    await userEvent.type(screen.getByLabelText('Email Address'), 'john@example.com')
    await userEvent.type(screen.getByLabelText('Your Message'), 'Hello world')

    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument()
    })
  })

  it('shows error message when submission fails', async () => {
    mockInsert.mockResolvedValue({ error: new Error('DB error') })
    render(<ContactPage />)

    await userEvent.type(screen.getByLabelText('Full Name'), 'John Doe')
    await userEvent.type(screen.getByLabelText('Email Address'), 'john@example.com')
    await userEvent.type(screen.getByLabelText('Your Message'), 'Hello world')

    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })

  it('shows submitting state on button', async () => {
    mockInsert.mockImplementation(() => new Promise(() => {}))
    render(<ContactPage />)

    await userEvent.type(screen.getByLabelText('Full Name'), 'John Doe')
    await userEvent.type(screen.getByLabelText('Email Address'), 'john@example.com')
    await userEvent.type(screen.getByLabelText('Your Message'), 'Hello world')

    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    expect(screen.getByRole('button', { name: /sending/i })).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
