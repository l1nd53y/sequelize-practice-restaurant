const {sequelize, DataTypes, Model} = require('./db');

const { Restaurant } = require('../src/restaurant');
const { Menu } = require('../src/menu');
const { MenuItem } = require('../src/menuitem');


//Create our Association!
MenuItem.belongsTo(Menu); //adds a foreign key on the MenuItem table, for the Menu it belongs to
Menu.belongsTo(Restaurant); // adds a foreign key on the Menu table, for the Restaurant it belongs to
Menu.hasMany(MenuItem); //gives us Sequelize magic methods
Restaurant.hasMany(Menu); 

module.exports = {Restaurant, Menu, MenuItem};