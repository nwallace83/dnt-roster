import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import store from './store'
import { Provider } from 'react-redux'
import Header from './components/header'
import ContentBody from './components/contentBody'
import ReduxToastr from 'react-redux-toastr'
import { makeServer } from './server'

if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' })
} 

// ========================================
  ReactDOM.render(
      <div className="container-fluid" id="app">
          <Provider store={store}>
              <Header/>
              <ContentBody />
              <ReduxToastr
              timeOut={3000}
              newestOnTop={false}
              preventDuplicates
              position="bottom-right"
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              closeOnToastrClick />
          </Provider>
      </div>,
    document.getElementById('root')
  )
  
