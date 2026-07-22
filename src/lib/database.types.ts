export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          title: string
          slug: string
          start_date: string
          end_date: string | null
          excerpt: string | null
          description: string | null
          image_url: string | null
          location: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          start_date: string
          end_date?: string | null
          excerpt?: string | null
          description?: string | null
          image_url?: string | null
          location?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          start_date?: string
          end_date?: string | null
          excerpt?: string | null
          description?: string | null
          image_url?: string | null
          location?: string | null
          created_at?: string | null
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string | null
          message: string
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject?: string | null
          message: string
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string | null
          message?: string
          created_at?: string | null
        }
      }
      gallery_images: {
        Row: {
          id: string
          url: string
          alt: string | null
          caption: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          url: string
          alt?: string | null
          caption?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          url?: string
          alt?: string | null
          caption?: string | null
          created_at?: string | null
        }
      }
    }
  }
}
