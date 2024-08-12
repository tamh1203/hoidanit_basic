import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Language from "../Header/Language";
import { useTranslation } from 'react-i18next';
import { IoSettingsOutline } from "react-icons/io5";
import { GrPowerShutdown } from "react-icons/gr";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    const { t, i18n } = useTranslation();

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)}>
                        <FaBars />
                    </span>
                    <div className="right-header">
                        <Language />
                        <NavDropdown className="languages" title={i18n.language == "vi" ? <GrPowerShutdown /> : <IoSettingsOutline />}>
                            <NavDropdown.Item >{t("settings.profile")}</NavDropdown.Item>
                            <NavDropdown.Item
                            // onClick={() => hanldeLogOut()}
                            >
                                {t("settings.logout")}</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div className="admin-main">

                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>

                <ToastContainer
                    position="top-center"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"

                />
            </div>
        </div >
    )
}
export default Admin;