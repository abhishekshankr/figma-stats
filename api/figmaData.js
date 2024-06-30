// api/figmaData.js

export default async function(req, res) {
  const { method } = req;

  // You can adjust the URL and parameters according to your needs
  const figmaApiUrl = 'https://www.figma.com/api/plugins/profile/2392090?';

  if (method === 'GET') {
      try {
          const figmaResponse = await fetch(figmaApiUrl, {
              method: 'GET',
              // Add headers if required by the Figma API
              headers: {
                "Accept": "application/json",
                //"Accept-Language": "en-US,en;q=0.9",
                "Content-Type": "application/json",
                //"tsid": "IcCc7EQuUAOq2aR8",
                //"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
                //"X-Csrf-Bypass": "yes"
              }
          });
          const data = await figmaResponse.json();
          console.log(data);
          // Sending the Figma API response back to the client
          res.status(200).json(data);
      } catch (error) {
          // Handle any errors that occur during the API request
          res.status(500).json({ message: 'Error fetching data from Figma API', error });
      }
  } else {
      // If the method is not GET, return a 405 Method Not Allowed status
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
