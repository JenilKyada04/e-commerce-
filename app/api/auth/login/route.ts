import { NextResponse } from "next/server"

// export async function POST(req: Request) {
//   const { username, password } = await req.json()

//   if (username === "jenil" && password === "1234") {
//     const response = NextResponse.json({ success: true })

//     response.cookies.set("token", "true", {
//       httpOnly: true,
//       path: "/",
//     })

//     return response
//   }

//   return NextResponse.json(
//     { success: false },
//     { status: 401 }
//   )
// }

import axios from "axios"

export async function POST(req: Request) {
    const { username, password } = await req.json();

    try {
        const response = await axios.post("https://fakestoreapi.com/auth/login", {
            username,
            password
        });

        const token = response.data.token;

        const res = NextResponse.json({ success: true });

        res.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
        });

        return res;
    }
    catch (error) {
        return NextResponse.json(
            { success: false },
            { status: 401 }
        );
    }
}



// export async function POST(req: Request) {
//   const { username, password } = await req.json()

//   if (!username || !password) {
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 })
//   }

//   const res = NextResponse.json({ success: true })

//   res.cookies.set("token", "demo-token", {
//     httpOnly: true, 
//     path: "/",
//   })

//   return res
// }
