import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import HomeRoute from './components/HomeRoute'
import ProtectedRoute from './components/ProtectedRoute'
import RestaurantDetailsRoute from './components/RestaurantDetailsRoute'
import CartDetails from './components/CartDetails'
import NotFound from './components/NotFound'
import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={RestaurantDetailsRoute}
    />
    <ProtectedRoute exact path="/cart" component={CartDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
