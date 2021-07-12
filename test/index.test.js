const {sequelize} = require("../src/db");

const { Restaurant, Menu, MenuItem } = require("../src/index.js");

describe('Restaurant', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    })

    test('can create restaurant', async() => {
        const testRestaurant = await Restaurant.create({name : 'Pizza Planet', image : 'resources/pizza-planet.jpg'});
        const testRestaurant2 = await Restaurant.create({name : 'Gusteau"s', image : 'resources/gusteaus.jpg'});
        expect(testRestaurant.name).toBe('Pizza Planet');
        expect(testRestaurant2.name).toBe('Gusteau"s');
        expect(testRestaurant.id).toBe(1);
        expect(testRestaurant2.id).toBe(2);
    })
})
///////////////
describe('Menu', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    })

    test('can create menu with title', async() => {
        const pizzaPlanet1 = await Menu.create({title : 'Lunar Liquids'});
        expect(pizzaPlanet1.title).toBe('Lunar Liquids');
        expect(pizzaPlanet1.id).toBe(1);
    })
})
///////////////
describe('Menu Items', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    })

    test('can create menu item with name & price', async() => {
        const alienSipper = await MenuItem.create({name : 'Alien Souvenir Sipper', price : 10.99});
        expect(alienSipper.name).toBe('Alien Souvenir Sipper');
        expect(alienSipper.price).toBe(10.99);
        expect(alienSipper.id).toBe(1);
    })
})
///////////////   
describe('Relationships', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    })

    test('restaurants have menus, menus have menu items', async () => {
        const restaurant = await Restaurant.create({name: 'Pizza Planet', image: 'resources/pizza-planet.jpg'})
        const menu = await Menu.create({title: 'Lunar Liquids'});
        await restaurant.addMenu(menu);
        const menus = await restaurant.getMenus();
        const menuItem = await MenuItem.create({name: 'Alien Souvenir Sipper', price: 10.99});
        await menus[0].addMenuItem(menuItem);
        const menuItems = await menus[0].getMenuItems();

        expect(menuItems.length).toBe(1);

        expect(menus[0].title).toBe('Lunar Liquids');
    })
})




