import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    // console.log({ request: request.body });
    // //@ts-ignore
    // const { message } = await request.body.json();
    // console.log({ message });

    // if (!message) {
    //   return NextResponse.json(
    //     { message: "No messages provided" },
    //     { status: 400 }
    //   );
    // }

    const message =
      "I want you to create a job announcement template for Senior Frontend Software Developer role/job, based on the follwing description: we want an experienced candidate who is able to do the job";

    const openai = new OpenAI({
      organization: process.env.OPEN_API_ORGANIZATION_ID,
      apiKey: process.env.OPEN_API_SECRET_KEY,
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "gpt-3.5-turbo",
    });

    if (completion?.choices) {
      const response = completion.choices[0].message;
      return NextResponse.json({ response });
    }

    return NextResponse.json(
      { message: "Semething when wrong, try again later" },
      { status: 500 }
    );
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json(
      { message: error.message || JSON.stringify(error) },
      { status: 400 }
    );
  }
}
