import bcryptjs from 'bcryptjs';

// hashing passwords

const Helper = {
  hashPassword: (password) => {
    const salt = bcryptjs.genSaltSync(12);
    const hash = bcryptjs.hashSync(password, salt);
    return hash;
  },
  comparePassword: (password, hashedPassword) => bcryptjs.compareSync(password, hashedPassword),
  
};
export default Helper;
