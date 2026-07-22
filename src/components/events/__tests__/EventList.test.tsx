import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import EventList from '../EventList'

const mockSelect = vi.fn()
const mockOrder = vi.fn()
const mockGte = vi.fn()
const mockLt = vi.fn()

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: () => ({
      select: mockSelect,
    }),
  },
}))

const upcomingEvents = [
  {
    id: '1',
    title: 'Youth Conference',
    start_date: '2099-06-15T10:00:00Z',
    excerpt: 'An exciting youth gathering',
    image_url: '/images/youth.jpg',
    slug: 'youth-conference',
  },
  {
    id: '2',
    title: 'Prayer Summit',
    start_date: '2099-07-20T09:00:00Z',
    excerpt: 'Join us for prayer',
    image_url: null,
    slug: 'prayer-summit',
  },
]

describe('EventList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSelect.mockReturnValue({ order: mockOrder })
  })

  it('shows loading skeleton initially', () => {
    mockOrder.mockReturnValue({ gte: mockGte })
    mockGte.mockResolvedValue({ data: null, error: null })

    const { container } = render(<EventList type="upcoming" />)
    expect(container.querySelector('.gmfci-el-skeleton-grid')).toBeInTheDocument()
  })

  it('renders upcoming events after loading', async () => {
    mockOrder.mockReturnValue({ gte: mockGte })
    mockGte.mockResolvedValue({ data: upcomingEvents, error: null })

    const { container } = render(<EventList type="upcoming" />)

    await waitFor(() => {
      expect(container.querySelectorAll('.gmfci-el-card').length).toBe(2)
      expect(screen.getByText('Youth Conference')).toBeInTheDocument()
    })
  })

  it('renders event time and date badge', async () => {
    mockOrder.mockReturnValue({ gte: mockGte })
    mockGte.mockResolvedValue({ data: upcomingEvents, error: null })

    const { container } = render(<EventList type="upcoming" />)

    await waitFor(() => {
      const dateBadges = container.querySelectorAll('.gmfci-el-date-badge')
      expect(dateBadges.length).toBe(2)
    })
  })

  it('renders Register / Learn More for upcoming events', async () => {
    mockOrder.mockReturnValue({ gte: mockGte })
    mockGte.mockResolvedValue({ data: upcomingEvents, error: null })

    render(<EventList type="upcoming" />)

    await waitFor(() => {
      const ctas = screen.getAllByText('Register / Learn More')
      expect(ctas.length).toBe(2)
    })
  })

  it('applies past class for past events', async () => {
    mockOrder.mockReturnValue({ lt: mockLt })
    mockLt.mockResolvedValue({ data: upcomingEvents, error: null })

    const { container } = render(<EventList type="past" />)

    await waitFor(() => {
      const cards = container.querySelectorAll('.gmfci-el-card--past')
      expect(cards.length).toBe(2)
    })
  })

  it('shows empty state when no upcoming events', async () => {
    mockOrder.mockReturnValue({ gte: mockGte })
    mockGte.mockResolvedValue({ data: [], error: null })

    render(<EventList type="upcoming" />)

    await waitFor(() => {
      expect(screen.getByText('No upcoming events scheduled')).toBeInTheDocument()
    })
  })

  it('shows empty state when no past events', async () => {
    mockOrder.mockReturnValue({ lt: mockLt })
    mockLt.mockResolvedValue({ data: [], error: null })

    render(<EventList type="past" />)

    await waitFor(() => {
      expect(screen.getByText('No past events found')).toBeInTheDocument()
    })
  })
})
