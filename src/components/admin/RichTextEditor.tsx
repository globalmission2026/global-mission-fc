"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, Heading2 } from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return <div style={{ minHeight: 200, border: "1px solid #d1d5db", borderRadius: 8, padding: 12, color: "#6b7280" }}>Loading editor...</div>;

  const btnStyle = (isActive: boolean): React.CSSProperties => ({
    background: isActive ? "#e5e7eb" : "transparent",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    padding: "6px 10px",
    cursor: "pointer",
    color: isActive ? "#111827" : "#6b7280",
  });

  return (
    <div style={{ border: "1px solid #d1d5db", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 6, padding: "8px 12px", borderBottom: "1px solid #d1d5db", background: "#f9fafb" }}>
        <button type="button" style={btnStyle(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
          <Bold size={18} />
        </button>
        <button type="button" style={btnStyle(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
          <Italic size={18} />
        </button>
        <button type="button" style={btnStyle(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading">
          <Heading2 size={18} />
        </button>
        <button type="button" style={btnStyle(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()} title="List">
          <List size={18} />
        </button>
      </div>
      <div style={{ padding: "12px 16px", minHeight: 200 }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
