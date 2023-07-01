import { NextApiBuilder, OurHandler } from '@/utils/api-builder/api-builder';
import { validateStatusCheck } from '@/utils/validator/test';

const handler: OurHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { status } = await validateStatusCheck(req.body);
    return res.json({ status });
  }
};

export default new NextApiBuilder(handler).build();
