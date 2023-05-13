import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import LoginComponent from './components/LoginComponent'
import LogoutComponent from './components/LogoutComponent'
import HeaderComponent from './components/HeaderComponent'
import ErrorComponent from './components/ErrorComponent'
import HomeComponent from './components/HomeComponent'
import CartComponent from './components/CartComponent'
import OrdersComponent from './components/OrdersComponent'
import ProfileComponent from './components/ProfileComponent'
import OrderComponent from './components/OrderComponent'
import RegisterComponent from './components/RegisterComponent'
import AddPaymentComponent from './components/AddPaymentComponent'
import PaymentComponent from './components/PaymentComponent'

import AuthProvider, { useAuth } from './components/auth/AuthContext'
import FooterComponent from './components/FooterComponent'
import Category from './components/Category'
import Product from './components/Product'

function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    if(authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export default function EcommerceApp() {
    return (
        <div className="container">
            <AuthProvider>
                <BrowserRouter>
                <HeaderComponent/>
                    <Routes>
                        
                        <Route path='/' element={<LoginComponent/>}/>
                        <Route path='/login' element={<LoginComponent/>}/>
                        <Route path='/register' element={<RegisterComponent/>}/>
                        <Route path='*' element={<ErrorComponent/>}/>

                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent/>
                            </AuthenticatedRoute>
                        }/>


                        <Route path='/home' element={
                            <AuthenticatedRoute>
                                <HomeComponent/>
                            </AuthenticatedRoute>
                        }/>

                        <Route path='/cart' element={
                            <AuthenticatedRoute>
                                <CartComponent/>
                            </AuthenticatedRoute>
                        }/>

                        <Route path='/profile' element={
                            <AuthenticatedRoute>
                                <ProfileComponent/>
                            </AuthenticatedRoute>
                        }/>

                        <Route path='/orders' element={
                            <AuthenticatedRoute>
                                <OrdersComponent/>
                            </AuthenticatedRoute>
                        }/>

                        <Route path='/orders/:id' element={
                            <AuthenticatedRoute>
                                <OrderComponent />
                            </AuthenticatedRoute>
                        }/>
                        <Route path='/payment' element={
                            <AuthenticatedRoute>
                                <AddPaymentComponent />
                            </AuthenticatedRoute>
                        }/>

                        <Route path='/payments' element={
                            <AuthenticatedRoute>
                                <PaymentComponent />
                            </AuthenticatedRoute>
                        }/>

                        <Route path='/category/add' element={
                            <AuthenticatedRoute>
                                <Category />
                            </AuthenticatedRoute>
                        }/>

                        <Route path='/product/add' element={
                            <AuthenticatedRoute>
                                <Product />
                            </AuthenticatedRoute>
                        }/>

                    </Routes>
                <FooterComponent/>
                </BrowserRouter>
            </AuthProvider>
            
        </div>
    )
}