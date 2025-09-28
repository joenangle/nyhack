// This serverless function avoids CORS issues
export default async function handler(req, res) {
  const { species } = req.query;
  
  if (!species) {
    return res.status(400).json({ error: 'Species name required' });
  }
  
  try {
    // Proxy request to GBIF
    const response = await fetch(
      `https://api.gbif.org/v1/species/match?name=${encodeURIComponent(species)}`
    );
    const data = await response.json();
    
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from GBIF' });
  }
}