import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
    const [auth] = useAuth()
    return (
        <Layout>
            <div className="container-fluid m-3 p-3">
                <div className="row">

                    <div className="col-md-3">
                        <AdminMenu />
                    </div>

                    <div className="col-md-9 ">
                        <div className="card w-75 p-3">
                            <h1>Hello,{auth?.user?.name} have a nice day!</h1>
                            <h1>{auth?.user?.email}</h1>
                            <h1>{auth?.user?.phone}</h1>


                        </div>

                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default AdminDashboard
