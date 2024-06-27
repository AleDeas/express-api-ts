import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database';

interface TableAttributes {
  id: number;
  number: number;
  capacity: number;
}

interface TableCreationAttributes extends Optional<TableAttributes, 'id'> {}

class Table extends Model<TableAttributes> implements TableAttributes {
  public id!: number;
  public number!: number;
  public capacity!: number;
}

Table.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Table'
});

export default Table;
