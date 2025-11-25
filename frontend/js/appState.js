let currentUser = null;

let items = [
  {
    id: '1',
    title: 'Black Leather Wallet',
    description: 'Black leather wallet with multiple card slots. Contains ID and credit cards.',
    category: 'Wallet',
    location: 'Central Park, near the fountain',
    date: '2025-11-03',
    contactName: 'John Doe',
    contactInfo: 'john.doe@email.com',
    status: 'lost',
    userId: '2',
    claims: []
  },
  {
    id: '2',
    title: 'Blue Backpack',
    description: 'Navy blue backpack with laptop compartment. Has a small tear on the side pocket.',
    category: 'Bag',
    location: 'City Library, 2nd floor',
    date: '2025-11-02',
    contactName: 'Sarah Smith',
    contactInfo: '555-0123',
    status: 'found',
    userId: '3',
    claims: []
  }
];

function setCurrentUser(user){
  currentUser = user;
  localStorage.setItem("user", JSON.stringify(user));
}

function getCurrentUser(){
  const stored = localStorage.getItem("user");
  if(stored) return JSON.parse(stored);
  return null;
}

function getItems(){
  return items;
}

function updateItems(newItems){
  items = newItems;
}
