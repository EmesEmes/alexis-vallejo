export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
        <p className="text-sm text-gray-400 font-serif">
          © {new Date().getFullYear()} Alexis Vallejo
        </p>
        <p className="text-xs text-gray-300 tracking-wide uppercase">
          FAO · UN
        </p>
      </div>
    </footer>
  );
}
