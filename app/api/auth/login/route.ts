import { NextResponse } from "next/server"
// import axios from "axios";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (username === "jenil" && password === "1234") {
      const response = NextResponse.json({ success: true });

      response.cookies.set("token", "dummy-token-12345", {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 30,
      }); 

      return response;
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}


// async function login() {
//   try {
//     const response = await axios.post(
//       "https://dummyjson.com/auth/login",
//       {
//         username: "emilys",
//         password: "emilyspass",
//         expiresInMins: 30, 
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true, 
//       }
//     );

//     console.log("Login Success:", response.data);
//   } catch (error: any) {
//     console.error(
//       "Login failed:",
//       error.response?.data || error.message
//     );
//   }
// }

// login();

