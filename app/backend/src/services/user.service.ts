import userModel from '../database/models/user.model';
import iUser from '../interfaces/iUser';

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

const getUserById = async (id: number): Promise<iUser> => {
  const user = await userModel.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  return user as unknown as iUser;
};

export default { getUserByEmail, getUserById };
