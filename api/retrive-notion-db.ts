import { NowRequest, NowResponse } from "@vercel/node"
import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID

export default async (req: NowRequest, res: NowResponse) => {
  const { query } = req
  const { id } = query

  try {
    const myPage = await notion.databases.query({
      database_id: databaseId,
      filter: {
        or: [
          {
            property: "Status",
            select: {
              equals: "Reading",
            },
          },
          {
            property: "Publisher",
            select: {
              equals: "NYT",
            },
          },
        ],
      },
    })

    console.log("myPage", myPage)
    console.log("myPage.results[0].properties", myPage.results[0].properties)

    res.json({ myPage })
  } catch (error) {
    console.error(error)
  }
}
