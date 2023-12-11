import axios from "axios";
import dotenv from "dotenv";
import { NextRequest, NextResponse } from "next/server";

dotenv.config();

export async function getRawgGames(req = NextRequest, res = NextResponse) {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page_size=18`
    );
    return NextResponse.json(response.data.results);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
