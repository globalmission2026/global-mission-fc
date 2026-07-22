import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}))

vi.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="swiper-slide">{children}</div>,
}))

vi.mock('swiper/modules', () => ({
  Autoplay: {},
  Pagination: {},
  EffectCoverflow: {},
}))

import Navbar from '@/components/layout/Navbar'
import Gallery from '@/components/home/Gallery'

describe('Navbar accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Navbar />)
    const results = await axe(container)
    expect(results.violations.length).toBe(0)
  })
})

describe('Gallery accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Gallery />)
    const results = await axe(container)
    expect(results.violations.length).toBe(0)
  })
})
