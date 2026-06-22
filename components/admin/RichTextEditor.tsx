"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  ImageIcon,
  Link as LinkIcon,
  Minus,
} from "lucide-react";

type Props = {
  content: string;
  onChange: (content: string) => void;
  onImageUpload: (file: File) => Promise<string>;
};

export default function RichTextEditor({
  content,
  onChange,
  onImageUpload,
}: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: false,
      }),
      Image.configure({ inline: false, allowBase64: false }),
      TiptapLink.configure({ openOnClick: false }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const url = await onImageUpload(file);
      editor.chain().focus().setImage({ src: url }).run();
    };
    input.click();
  };

  const handleLink = () => {
    const url = window.prompt("URL del enlace:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const tools = [
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      title: "Negrita",
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      title: "Cursiva",
    },
    {
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
      title: "Título 2",
    },
    {
      icon: Heading3,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editor.isActive("heading", { level: 3 }),
      title: "Título 3",
    },
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
      title: "Lista",
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      title: "Lista numerada",
    },
    {
      icon: Minus,
      action: () => editor.chain().focus().setHorizontalRule().run(),
      active: false,
      title: "Separador",
    },
    {
      icon: LinkIcon,
      action: handleLink,
      active: editor.isActive("link"),
      title: "Enlace",
    },
    {
      icon: ImageIcon,
      action: handleImageUpload,
      active: false,
      title: "Imagen",
    },
  ];

  return (
    <div className="border border-gray-200 rounded overflow-hidden focus-within:border-secondary transition-colors">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-100 bg-gray-50 flex-wrap">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.title}
              type="button"
              onClick={tool.action}
              title={tool.title}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                tool.active
                  ? "bg-secondary text-white"
                  : "text-gray-500 hover:text-secondary hover:bg-gray-100"
              }`}
            >
              <Icon size={15} />
            </button>
          );
        })}
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 min-h-48 focus:outline-none text-gray-800 [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-48"
      />
    </div>
  );
}
