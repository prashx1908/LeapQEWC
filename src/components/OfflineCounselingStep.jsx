const preferredCities = ['bangalore', 'chennai', 'pune', 'gurgaon', 'ludhiana'];
if (!preferredCities.includes(city?.toLowerCase())) return null;

if (city?.toLowerCase() === 'bangalore' && counselingType === 'offline') {
  // Show MG Road/HSR Layout question
} 