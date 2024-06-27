import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database';

interface CustomerAttributes {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface CustomerCreationAttributes extends Optional<CustomerAttributes, 'id'> {}

class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public phone!: string;
  public email!: string;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'Customer',
  }
);

export default Customer;
