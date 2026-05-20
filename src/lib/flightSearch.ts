// Keep it as a simple function returning a Promise. 
// No server-side dependencies allowed.

export async function searchFlights(origin: string, destination: string, passengers: any) {
  console.log(`Searching flights from ${origin} to ${destination} for ${passengers.adults} adults...`);
  
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Static dummy data that works in any browser
  return [
    { id: 1, airline: 'British Airways', price: '£250', time: '10:00 AM' },
    { id: 2, airline: 'Emirates', price: '£420', time: '02:30 PM' },
  ];
}