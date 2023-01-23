import userModel from '../database/models/user.model';
import { iUser } from '../interfaces';

const getUserByEmail = async (email: string): Promise<iUser> => {
  const user = await userModel.findOne({ where: { email } });
  return {
    id: user?.dataValues.id,
    username: user?.dataValues.username,
    role: user?.dataValues.role,
    email: user?.dataValues.email,
    password: user?.dataValues.password,
  };
};

export default { getUserByEmail };
