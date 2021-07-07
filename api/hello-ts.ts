import { NowRequest, NowResponse } from "@vercel/node"

// request -> ?id={your_id}
export default async (req: NowRequest, res: NowResponse) => {
  const { query } = req
  const { id } = query
  res.json({ id })
}
