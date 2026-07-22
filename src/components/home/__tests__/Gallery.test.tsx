import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Gallery from '../Gallery'

vi.mock('swiper/react', () => ({
  Swiper: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => <div data-testid="swiper" style={style}>{children}</div>,
  SwiperSlide: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => <div data-testid="swiper-slide" style={style}>{children}</div>,
}))

vi.mock('swiper/modules', () => ({
  Autoplay: {},
  Pagination: {},
  EffectCoverflow: {},
}))

describe('Gallery', () => {
  it('renders all gallery images', () => {
    render(<Gallery />)
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThanOrEqual(10)
  })

  it('renders swiper component', () => {
    const { container } = render(<Gallery />)
    expect(container.querySelector('[data-testid="swiper"]')).toBeInTheDocument()
  })
})
