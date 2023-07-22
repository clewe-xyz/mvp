import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;
  const response = await fetch(`${process.env.API_HOST_URL}/quests/${id}`);
  if (!response.ok) {
    const errorDetails = await response.json();
    return NextResponse.json(errorDetails, { status: response.status });
  }
  return response;
}
