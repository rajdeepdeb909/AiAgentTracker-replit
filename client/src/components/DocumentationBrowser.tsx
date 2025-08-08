import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Folder, FileText, Edit, Download } from "lucide-react";

interface DocumentationFile {
  id: string;
  name: string;
  filename: string;
  category: string;
  highlight: string;
}

interface DocumentationContent {
  content: string;
  filename: string;
}

export default function DocumentationBrowser() {
  const [selectedFile, setSelectedFile] = useState<string>("AMERICAS_HOME_MANAGER_OPERATIONS_GUIDE.md");

  // Fetch documentation files list
  const { data: documentationFiles, isLoading: filesLoading } = useQuery<DocumentationFile[]>({
    queryKey: ["/api/documentation/files"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch selected file content
  const { data: fileContent, isLoading: contentLoading } = useQuery<DocumentationContent>({
    queryKey: ["/api/documentation/content", selectedFile],
    enabled: !!selectedFile,
    staleTime: 60 * 1000, // 1 minute
  });

  // Build file structure from API data
  const buildFileStructure = () => {
    if (!documentationFiles) return [];
    
    const categorizedFiles = documentationFiles.reduce((acc, file) => {
      if (!acc[file.category]) {
        acc[file.category] = [];
      }
      acc[file.category].push(file);
      return acc;
    }, {} as Record<string, DocumentationFile[]>);

    return [
      {
        type: "folder",
        name: "📁 ai-agents-platform/",
        children: Object.entries(categorizedFiles).map(([category, files]) => ({
          type: "folder",
          name: `📁 ${category}/`,
          children: files.map(file => ({
            type: "file",
            name: `📄 ${file.name}`,
            filename: file.filename,
            highlight: file.highlight
          }))
        }))
      }
    ];
  };

  const fileStructure = buildFileStructure();

  const getHighlightClass = (highlight?: string) => {
    switch(highlight) {
      case "primary":
        return "bg-blue-500/20 border-blue-500/40 text-blue-300";
      case "secondary":
        return "bg-gray-500/20 border-gray-500/40 text-gray-300";
      case "technical":
        return "bg-purple-500/20 border-purple-500/40 text-purple-300";
      case "business":
        return "bg-green-500/20 border-green-500/40 text-green-300";
      default:
        return "hover:bg-gray-700/50";
    }
  };


  const renderFileTree = (items: any[], level = 0) => {
    return items.map((item, index) => (
      <div key={index} style={{ marginLeft: `${level * 16}px` }}>
        <div 
          className={`flex items-center cursor-pointer hover:text-blue-300 py-1 ${
            item.type === 'folder' ? 'text-blue-400' : 'text-green-400'
          }`}
          onClick={() => {
            if (item.type === 'file') {
              setSelectedFile(item.name.replace('📄 ', ''));
              // Only scroll the content area to top, not the entire page
              setTimeout(() => {
                const contentArea = document.querySelector('.documentation-content');
                if (contentArea) {
                  contentArea.scrollTop = 0;
                }
              }, 100);
            }
          }}
        >
          {item.type === 'folder' ? <Folder className="w-4 h-4 mr-2" /> : <FileText className="w-4 h-4 mr-2" />}
          <span>{item.name}</span>
        </div>
        {item.children && renderFileTree(item.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
      <h3 className="text-xl font-semibold text-white mb-4">Documentation Repository</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gray-800 p-4 rounded-lg font-mono text-sm">
            <div className="space-y-1">
              {filesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-gray-400">Loading files...</div>
                </div>
              ) : (
                renderFileTree(fileStructure)
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">{selectedFile}</h4>
              <div className="flex gap-2">
                <Button size="sm" className="bg-primary hover:bg-primary/80">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="secondary" className="bg-gray-600 hover:bg-gray-500">
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            <div className="documentation-content text-gray-300 text-sm leading-relaxed max-h-96 overflow-y-auto">
              {contentLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-gray-400">Loading content...</div>
                </div>
              ) : (
                <div className="prose prose-invert prose-sm max-w-none">
                  <div className="whitespace-pre-line">
                    {fileContent?.content || "File not found"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
