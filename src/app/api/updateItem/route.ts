import { NextApiRequest, NextApiResponse } from 'next';
/* import connection from './mysql'; */

export default async function handler(req: NextApiRequest & { body: { id: any; newName: any; }; }, res: NextApiResponse) {

  if (req.method !== "PATCH"){
    res.status(405)
    return
  }

  const { id, newName } = req.body;

  try {
    /* await connection.promise().query('UPDATE items SET name = ? WHERE id = ?', [newName, id]); */
    res.status(200).json({ message: 'Item updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};
