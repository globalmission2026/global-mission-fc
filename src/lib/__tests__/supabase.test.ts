import { describe, it, expect, beforeAll } from 'vitest'

describe('Supabase client', () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';
  });

  it('exports a supabase client', async () => {
    const { supabase } = await import('../supabase')
    expect(supabase).toBeDefined()
    expect(supabase.from).toBeInstanceOf(Function)
  })
})
