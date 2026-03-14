export const lostItems = [
  {
    id: 'l1',
    name: 'Sony WH-1000XM5',
    type: 'Electronics',
    color: 'Midnight Blue',
    date: 'March 10, 2024',
    location: 'Main Library - Floor 3',
    status: 'Searching',
    image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'l2',
    name: 'Hydro Flask',
    type: 'Personal Item',
    color: 'Pacific Blue',
    date: 'March 11, 2024',
    location: 'Campus Cafe',
    status: 'Found (Verifying)',
    image: 'https://images.unsplash.com/photo-1594732832278-f6285a866164?auto=format&fit=crop&q=80&w=300'
  }
];

export const matches = [
  {
    id: 'm1',
    itemName: 'Sony Headphones (Blue)',
    location: 'Engineering Block - Lab 204',
    foundDate: 'March 12, 2024',
    matchScore: 94,
    status: 'Pending Verification',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426ff472b?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'm2',
    itemName: 'Water Bottle',
    location: 'Student Union Basement',
    foundDate: 'March 12, 2024',
    matchScore: 82,
    status: 'Reported',
    image: 'https://images.unsplash.com/photo-1627748135111-a83d97f4c0ee?auto=format&fit=crop&q=80&w=300'
  }
];

export const statistics = {
  totalItems: 842,
  itemsReturned: 615,
  activeReports: 127,
  successRate: 74
};
