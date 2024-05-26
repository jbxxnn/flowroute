import connection from './mysql';

const updateItem = async (req: { body: { id: any; newName: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  const { id, newName } = req.body;

  try {
    await connection.promise().query('UPDATE items SET name = ? WHERE id = ?', [newName, id]);
    res.status(200).json({ message: 'Item updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

export default updateItem;
