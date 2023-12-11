import './App.css';
import AppRouter from './components/AppRouter';
import { BrowserRouter as Router} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import { useContext, useEffect, useState } from 'react';
import { check } from './http/userAPI';

const App =  observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      check().then(data => {
          user.setIsAuth(true)
          user.setId(data.id)
      }).catch(error =>
        console.log("Тут ошибка ",error)

      ).finally(() => setLoading(false))
  }, [])

  return (
    <div className="App">
      <Router>
        <AppRouter/>
      </Router>
    </div>
  );
})

export default App;