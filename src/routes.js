import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';
import New from './pages/New';


const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book,
        New

    })
);

export default Routes;