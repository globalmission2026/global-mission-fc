"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase-client";
import { generateSlug } from "@/lib/slug";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUpload from "@/components/admin/ImageUpload";

export default function EditEvent() {
  const router = useRouter();
  const params = useParams();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [slugEdited, setSlugEdited] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    start_date: "",
    end_date: "",
    excerpt: "",
    description: "",
    location: "",
    image_url: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await supabase.from("events").select("*").eq("id", params.id).single();
      if (data) {
        const isOld = !!data.slug;
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          start_date: data.start_date ? data.start_date.slice(0, 16) : "",
          end_date: data.end_date ? data.end_date.slice(0, 16) : "",
          excerpt: data.excerpt || "",
          description: data.description || "",
          location: data.location || "",
          image_url: data.image_url || "",
        });
        setSlugEdited(isOld);
      }
      setFetching(false);
    };
    fetchEvent();
  }, [params.id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: slugEdited ? prev.slug : generateSlug(title),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "slug") setSlugEdited(true);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.start_date || !form.slug) {
      toast.error("Title, slug, and start date are required");
      return;
    }
    setLoading(true);

    const { error } = await supabase
      .from("events")
      .update({
        title: form.title,
        slug: form.slug,
        start_date: new Date(form.start_date).toISOString(),
        end_date: form.end_date ? new Date(form.end_date).toISOString() : null,
        excerpt: form.excerpt || null,
        description: form.description || null,
        location: form.location || null,
        image_url: form.image_url || null,
      })
      .eq("id", params.id);

    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Event updated");
      router.push("/admin/events");
      router.refresh();
    }
  };

  if (fetching) return <div style={{ padding: 24, color: "#6b7280" }}>Loading...</div>;

  return (
    <div className="gmfci-admin-table-wrap">
      <div className="gmfci-admin-table-header">
        <h3>Edit Event</h3>
      </div>
      <form onSubmit={handleSubmit} style={{ padding: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div className="gmfci-admin-input-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              required
              value={form.title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="gmfci-admin-input-group">
            <label htmlFor="slug">Slug *</label>
            <input id="slug" name="slug" required value={form.slug} onChange={handleChange} />
          </div>
          <div className="gmfci-admin-input-group">
            <label htmlFor="start_date">Start Date *</label>
            <input
              id="start_date"
              name="start_date"
              type="datetime-local"
              required
              value={form.start_date}
              onChange={handleChange}
            />
          </div>
          <div className="gmfci-admin-input-group">
            <label htmlFor="end_date">End Date</label>
            <input
              id="end_date"
              name="end_date"
              type="datetime-local"
              value={form.end_date}
              onChange={handleChange}
            />
          </div>
          <div className="gmfci-admin-input-group">
            <label htmlFor="location">Location</label>
            <input id="location" name="location" value={form.location} onChange={handleChange} />
          </div>
          <div className="gmfci-admin-input-group">
            <label>Image</label>
            <ImageUpload
              uploadPreset="gmfc_unsigned"
              currentUrl={form.image_url}
              onUpload={(url) => setForm((prev) => ({ ...prev, image_url: url }))}
            />
          </div>
        </div>
        <div className="gmfci-admin-input-group" style={{ marginBottom: 20 }}>
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: 12,
              border: "1px solid #d1d5db",
              borderRadius: 8,
              fontSize: 15,
              minHeight: 80,
            }}
          />
        </div>
        <div className="gmfci-admin-input-group" style={{ marginBottom: 24 }}>
          <label>Description</label>
          <RichTextEditor
            content={form.description}
            onChange={(html) => setForm((prev) => ({ ...prev, description: html }))}
          />
        </div>
        <button
          type="submit"
          className="gmfci-admin-btn-primary"
          disabled={loading}
          style={{ width: "auto", padding: "12px 32px" }}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
