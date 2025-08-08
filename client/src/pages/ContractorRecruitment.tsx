import { useLocation } from "wouter";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ContractorRecruitment from "@/components/ContractorRecruitmentSimple";

export default function ContractorRecruitmentPage() {
  const [, setLocation] = useLocation();

  // Ensure the page scrolls to top when loaded
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar />
      <main className="flex-1 overflow-auto flex flex-col">
        <ContractorRecruitment />
      </main>
    </div>
  );
}