import { authOptions } from "@/config/nextAuth/nextAuth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export default async function TestPage(req: NextRequest) {
  const accessToken = await getServerSession(authOptions);

  return (
    <div>
      <h1>Test Page</h1>
      <p>{JSON.stringify(accessToken)}</p>
    </div>
  );
}
