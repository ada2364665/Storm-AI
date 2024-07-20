// api/signup.js
export default async (req, res) => {
    if (req.method === 'POST') {
      const { email, password } = req.body;
  
      // Implement your sign-up logic here
      // Example: Simulate user creation
      try {
        const user = { email, id: new Date().getTime() };
        res.status(201).json({ user });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  };
  