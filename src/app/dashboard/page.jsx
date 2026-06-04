import React, { useContext, useEffect } from "react";
import { UserContext } from "../../components/ui/UserContext";
import DashboardHome from "../../components/ui/DashboardHome";
import DashboardDoctor from "../../components/ui/DashboardDoctor";
import DashboardNurse from "../../components/ui/DashboardNurse";
import DashboardPatient from "../../components/ui/DashboardPatient";
import DashboardAdmin from "../../components/ui/DashboardAdmin";
import { useRouter } from "next/navigation";

/**
 * Dashboard page. The dashboard content varies by user role. When the user
 * is not authenticated, redirect them back to the login page. Once
 * authenticated, render the appropriate dashboard component.
 */
export default function DashboardPage() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  switch (user.role) {
    case "admin":
      return <DashboardAdmin user={user} />;
    case "doctor":
      return <DashboardDoctor user={user} />;
    case "nurse":
      return <DashboardNurse user={user} />;
    case "patient":
      return <DashboardPatient user={user} />;
    default:
      return <DashboardHome user={user} />;
  }
}
