import Sidebar from "@/components/Sidebar";
import DocumentationBrowser from "@/components/DocumentationBrowser";

export default function Documentation() {

  return (
    <div className="flex min-h-screen bg-dark text-gray-200">
      <Sidebar />
      
      <main className="flex-1 overflow-x-hidden">
        <header className="bg-dark-card border-b border-dark-border p-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Documentation</h1>
            <p className="text-gray-400 mt-1">Browse and manage AI agent documentation and resources</p>
          </div>
        </header>

        <div className="p-6">
          <DocumentationBrowser />
        </div>
      </main>
    </div>
  );
}