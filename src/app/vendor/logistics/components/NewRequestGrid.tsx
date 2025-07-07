import { type INewRequest, NewRequestCard } from "./NewRequestCard";

const mockRequests: INewRequest[] = [
  {
    id: "REQ-001",
    rider: {
      id: "RID-001",
      name: "Chance Septimus",
      phone: "+19876543210",
      email: "chanceseptimus@gmail.com",
    },
    pickupPoint: "1901 Thornridge Cir. Shiloh, Hawaii",
    dropPoint: "2464 Royal Ln. Mesa, New Jersey",
    pickupTime: "10:00 AM",
    pickupDate: "2025-07-07",
  },
  // 7 more mock requests
  {
    id: "REQ-002",
    rider: {
      id: "RID-002",
      name: "Alex Johnson",
      phone: "+12345678901",
      email: "alex.johnson@example.com",
    },
    pickupPoint: "123 Main St. Springfield, Illinois",
    dropPoint: "456 Oak Ave. Lincoln, Nebraska",
    pickupTime: "11:30 AM",
    pickupDate: "2025-07-08",
  },
  {
    id: "REQ-003",
    rider: {
      id: "RID-003",
      name: "Maria Garcia",
      phone: "+19876543211",
      email: "maria.garcia@example.com",
    },
    pickupPoint: "789 Pine Rd. Miami, Florida",
    dropPoint: "321 Maple Dr. Orlando, Florida",
    pickupTime: "09:15 AM",
    pickupDate: "2025-07-09",
  },
  {
    id: "REQ-004",
    rider: {
      id: "RID-004",
      name: "Liam Smith",
      phone: "+19876543212",
      email: "liam.smith@example.com",
    },
    pickupPoint: "654 Cedar St. Dallas, Texas",
    dropPoint: "987 Birch Ln. Austin, Texas",
    pickupTime: "02:00 PM",
    pickupDate: "2025-07-10",
  },
  {
    id: "REQ-005",
    rider: {
      id: "RID-005",
      name: "Emma Brown",
      phone: "+19876543213",
      email: "emma.brown@example.com",
    },
    pickupPoint: "111 Elm St. Seattle, Washington",
    dropPoint: "222 Spruce Ave. Tacoma, Washington",
    pickupTime: "03:45 PM",
    pickupDate: "2025-07-11",
  },
  {
    id: "REQ-006",
    rider: {
      id: "RID-006",
      name: "Noah Wilson",
      phone: "+19876543214",
      email: "noah.wilson@example.com",
    },
    pickupPoint: "333 Willow Rd. Denver, Colorado",
    dropPoint: "444 Aspen Dr. Boulder, Colorado",
    pickupTime: "01:20 PM",
    pickupDate: "2025-07-12",
  },
  {
    id: "REQ-007",
    rider: {
      id: "RID-007",
      name: "Olivia Martinez",
      phone: "+19876543215",
      email: "olivia.martinez@example.com",
    },
    pickupPoint: "555 Redwood St. San Jose, California",
    dropPoint: "666 Cypress Ave. San Francisco, California",
    pickupTime: "04:10 PM",
    pickupDate: "2025-07-13",
  },
  {
    id: "REQ-008",
    rider: {
      id: "RID-008",
      name: "William Lee",
      phone: "+19876543216",
      email: "william.lee@example.com",
    },
    pickupPoint: "777 Magnolia Blvd. Los Angeles, California",
    dropPoint: "888 Palm Dr. San Diego, California",
    pickupTime: "05:30 PM",
    pickupDate: "2025-07-14",
  },
];

export function NewRequestGrid() {
  return (
    <div className="p-8 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockRequests.map((request) => (
        <NewRequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}
