import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import HomeRoute from './components/HomeRoute'
import ProtectedRoute from './components/ProtectedRoute'
import RestaurantDetailsRoute from './components/RestaurantDetailsRoute'
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
    <Redirect to="not-found" />
  </Switch>
)

export default App
