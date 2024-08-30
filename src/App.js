import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import { store } from "./Store";
import { Provider } from "react-redux";
import Right from "./Right";
import Left from "./Left";
function App() {

  const route= createBrowserRouter([{
    path:"/",  element: <Home /> , 
      children: [{path:"/", element:<Left />, 
        children:[{path:"/Right/:id", element:<Right />}, {path:"/contact", element:<Contact />}]}]}
    ]);
  return (
    
      <Provider store={store}>
        <RouterProvider router={route} />
      </Provider>
  );
}

export default App;
