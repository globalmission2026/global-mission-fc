import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

describe('Hero', () => {
  it('renders hero section with background image', () => {
    render(<Hero />)
    const heroImg = screen.getByAltText(/hero background/i)
    expect(heroImg).toBeInTheDocument()
    expect(heroImg).toHaveAttribute('src')
  })

  it('renders call-to-action links', () => {
    render(<Hero />)
    expect(screen.getByText(/watch latest sermon/i)).toBeInTheDocument()
    expect(screen.getByText(/give to the mission/i)).toBeInTheDocument()
  })

  it('renders word rotator words', () => {
    render(<Hero />)
    expect(screen.getByText('TO THE NATIONS')).toBeInTheDocument()
    expect(screen.getByText('TO THE COMMUNITIES')).toBeInTheDocument()
    expect(screen.getByText('TO THE WORLD')).toBeInTheDocument()
  })

  it('renders stats bar with four stat items', () => {
    const { container } = render(<Hero />)
    const statNums = container.querySelectorAll('.gmfci-stat-num')
    expect(statNums.length).toBe(4)
  })

  it('renders scroll indicator', () => {
    const { container } = render(<Hero />)
    expect(container.querySelector('.gmfci-scroll-indicator')).toBeInTheDocument()
  })

  it('renders particles canvas', () => {
    const { container } = render(<Hero />)
    expect(container.querySelector('.gmfci-particles-canvas')).toBeInTheDocument()
  })

  it('renders first stat with target attribute', () => {
    const { container } = render(<Hero />)
    const firstStat = container.querySelector('.gmfci-stat-num')
    expect(firstStat?.getAttribute('data-target')).toBe('34200')
    expect(firstStat?.getAttribute('data-suffix')).toBe('+')
  })
})
