import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import EmployerSignup from './pages/EmployerSignup.jsx'
import UserRegistration from './pages/UserRegistration.jsx'
import EmployerSection from './pages/EmployerSection.jsx'
import EmployerPost from './pages/EmployerPost.jsx'
import Shortlisted from './pages/Shortlisted.jsx'
import UserJobPost from './pages/UserJobPost.jsx'
import SearchJobs from './pages/SearchJobs.jsx'


const router = createBrowserRouter(
  [
    {path:"/",
      element:<Home/>
    },
    {path:"/jobs",
      element:<Jobs/>
    },
    {path:"/search_jobs",
      element:<SearchJobs/>
    },
    {path:"/login",
      element:<Login/>
    },
    {path:"/employer-signup",
      element:<EmployerSignup/>
    },
    {path:"/user-signup",
      element:<Signup/>
    }
    ,{path:"/user-personal-tab",
      element:<UserRegistration/>
    },
    {path:"/employer-personal-tab",
      element:<EmployerSection/>
    }
  ]
)

function App() {
  


  return (
  <RouterProvider router={router}/>
 

  )
}

export default App;
