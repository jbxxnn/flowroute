import { NextResponse, NextRequest } from 'next/server';

export async function PATCH(request: NextRequest) {
  if (request.method !== "PATCH") {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  const { id, newName } = await request.json();

  try {
    /* await connection.promise().query('UPDATE items SET name = ? WHERE id = ?', [newName, id]); */
    return NextResponse.json({ message: 'Item updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
