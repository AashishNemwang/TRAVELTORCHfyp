import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

function AgencyDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Always visible */}
      <div className="w-64 bg-gray-800 text-white p-6 min-h-screen">
        <h2 className="text-xl font-bold mb-8">Travel Agency Portal</h2>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-md mx-auto mt-12">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Welcome to TravelTorch</h1>
              <p className="mb-6 text-gray-600">
                Manage your travel packages and bookings in one place
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link to="/login">Agency Login</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/signup">Register Your Agency</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Empty Dashboard Preview */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Your Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-12 text-center">
                <p className="text-gray-500 mb-4">
                  You haven't added any packages yet
                </p>
                <Button asChild>
                  <Link to="/add-package">Add Your First Package</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AgencyDashboard;