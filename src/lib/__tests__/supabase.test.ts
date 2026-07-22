import { describe, it, expect } from 'vitest'

describe('Supabase client', () => {
  it('exports a supabase client', async () => {
    const { supabase } = await import('../supabase')
    expect(supabase).toBeDefined()
    expect(supabase.from).toBeInstanceOf(Function)
  })
})
