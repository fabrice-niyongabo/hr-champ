import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { message: "No message provided" },
        { status: 400 }
      );
    }

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
