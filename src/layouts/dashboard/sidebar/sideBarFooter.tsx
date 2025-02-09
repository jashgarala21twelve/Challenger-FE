import { SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import AlertDialogComponent from "@/components/alertDialog/alertConfirmDialog";
import { useAuth } from "@/context/authContext";

export const SidebarFooterComponent = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <SidebarFooter className="border-t  border-r border-secondary dark:bg-gray-950">
      <div className="flex flex-col gap-5 py-3">
        <Button variant="outline">Change Password</Button>

        {/* Logout Button with Alert Dialog */}
        <AlertDialogComponent
          title="Are you sure you want to logout?"
          description="You will need to log in again to access your account."
          confirmText="Logout"
          cancelText="Cancel"
          onConfirm={handleLogout}
          triggerText="Logout"
          variant="destructive"
          confirmButtonClass="bg-destructive text-white hover:bg-red-600"
        />
      </div>
    </SidebarFooter>
  );
};
