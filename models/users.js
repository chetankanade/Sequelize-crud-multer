module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define("User", {
    firstName: {
      type: Datatypes.STRING,
    },
    email: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
    addImage: {
      type: Datatypes.BLOB("long"),
    },
    password: {
      type: Datatypes.STRING,
    },
  });
  return User;
};
