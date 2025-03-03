import { ChallengerLogoComponent } from "@/components/media";
import { SidebarHeader } from "@/components/ui/sidebar";

const SidebarHeaderComponent = () => {
  return (
    <SidebarHeader className="bg-primary  text-center font-bold h-20 text-white items-center flex justify-center">
      <ChallengerLogoComponent />
    </SidebarHeader>
  );
};

export default SidebarHeaderComponent;
