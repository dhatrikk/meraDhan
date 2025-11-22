import HeaderSection from "../components/HeaderSection";
import TabsSection from "../components/TabSection";
import Events from "../components/Events";

export default function Home() {
  
  return (
    <div className="w-full md:p-25 p-10">
      <HeaderSection />
      <TabsSection />
      <Events />
    </div>
  );
}
