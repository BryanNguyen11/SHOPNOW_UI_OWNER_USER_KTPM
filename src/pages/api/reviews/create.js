export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Get request body and authorization header
    const { rating, comment, productId, customerId } = req.body;


    console.log('Request body:', req.body);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!rating || !comment || !productId || !customerId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Call backend API to create review
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({
        rating,
        comment,
        productId,
        customerId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from backend:', errorData);
      throw new Error(`Backend returned status ${response.status}`);
    }
    return res.status(201).json("Review created successfully");
  } catch (error) {
    console.error('Error creating review:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}