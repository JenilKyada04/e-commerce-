import { NextResponse } from "next/server";

const users = [
  { username: "user1", password: "1234", role: "user" },
  { username: "user2", password: "2222", role: "user" },
];

const admin = {
  username: "jenil",
  password: "1234",
  role: "admin",
};

export async function POST(req: Request) {
  const { username, password, role } = await req.json();

  if (role === "admin") {
    if (
      username === admin.username &&
      password === admin.password
    ) {
      return NextResponse.json({ role: "admin" });
    }
    return NextResponse.json(
      { message: "Invalid admin credentials" },
      { status: 401 }
    );
  }

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { message: "Invalid user credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json({ role: "user" });
}
