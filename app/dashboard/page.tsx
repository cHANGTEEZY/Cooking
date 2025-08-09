import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navigation from "@/components/Navigation";

const DashboardPage = async () => {
  // Get authentication info
  const { userId } = await auth();

  // Redirect to sign-in if not authenticated
  //   if (!userId) {
  //     redirect("/sign-in");
  //   }

  // Get current user info
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to your Dashboard, {user?.firstName || "User"}!
            </h1>
            <p className="text-muted-foreground">
              Manage your events and discover new ones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-lg font-semibold mb-2">My Events</h3>
              <p className="text-muted-foreground mb-4">
                View and manage your created events
              </p>
              <p className="text-2xl font-bold text-primary">0</p>
            </div>

            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-lg font-semibold mb-2">Bookmarked</h3>
              <p className="text-muted-foreground mb-4">
                Events you've saved for later
              </p>
              <p className="text-2xl font-bold text-primary">0</p>
            </div>

            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-lg font-semibold mb-2">Attended</h3>
              <p className="text-muted-foreground mb-4">
                Events you've participated in
              </p>
              <p className="text-2xl font-bold text-primary">0</p>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">
                  {user?.fullName || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">
                  {user?.primaryEmailAddress?.emailAddress || "Not provided"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="font-medium font-mono text-xs">{userId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
