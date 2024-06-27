import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database';
import Table from './table';
import Customer from './customer';

interface ReservationAttributes {
  id: number;
  tableId: number;
  customerId: number;
  date: Date;
  time: string;
}

interface ReservationCreationAttributes extends Optional<ReservationAttributes, 'id'> {}

class Reservation extends Model<ReservationAttributes, ReservationCreationAttributes> implements ReservationAttributes {
  public id!: number;
  public tableId!: number;
  public customerId!: number;
  public date!: Date;
  public time!: string;
}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Table,
        key: 'id',
      },
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Reservation',
  }
);

Table.hasMany(Reservation, { foreignKey: 'tableId' });
Customer.hasMany(Reservation, { foreignKey: 'customerId' });
Reservation.belongsTo(Table, { foreignKey: 'tableId' });
Reservation.belongsTo(Customer, { foreignKey: 'customerId' });

export default Reservation;
