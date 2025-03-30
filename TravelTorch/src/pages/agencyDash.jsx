import { useState } from "react";
import { Button } from "./../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Table, Thead, Tbody, Tr, Th, Td } from "../components/ui/table";

function agencyDash() {
  const [packages, setPackages] = useState([
    { id: 1, name: "Bali Adventure", price: "$1200", duration: "7 Days" },
    { id: 2, name: "Paris Getaway", price: "$1800", duration: "5 Days" },
  ]);
 
  const handleDelete = (id) => {
    setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  return (
    <div className="flex h-screen">
      <AgencySidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Travel Packages</h1>
        <Card>
          <CardContent>
            <Button className="mb-4">Add New Package</Button>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Price</Th>
                  <Th>Duration</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {packages.map((pkg) => (
                  <Tr key={pkg.id}>
                    <Td>{pkg.id}</Td>
                    <Td>{pkg.name}</Td>
                    <Td>{pkg.price}</Td>
                    <Td>{pkg.duration}</Td>
                    <Td>
                      <Button variant="outline" className="mr-2">Edit</Button>
                      <Button variant="destructive" onClick={() => handleDelete(pkg.id)}>Delete</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AgencySidebar() {
  return (
    <div className="w-64 bg-gray-600 text-white p-6 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Travel Agency Dashboard</h2>
      <ul>
        <li className="mb-2"><a href="#" className="hover:text-gray-400">Dashboard</a></li>
        <li className="mb-2"><a href="#" className="hover:text-gray-400">Packages</a></li>
        <li className="mb-2"><a href="#" className="hover:text-gray-400">Bookings</a></li>
        <li className="mb-2"><a href="#" className="hover:text-gray-400">Users</a></li>
      </ul>
    </div>
  );
}

export default agencyDash;
