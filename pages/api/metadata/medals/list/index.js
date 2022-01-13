import getMedals from '@lib/helper'

export default async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  res.status(200).send(getMedals());
}
