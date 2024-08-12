import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaList, FaGithub, } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { MdDashboard } from "react-icons/md";
import { GiAbstract066 } from "react-icons/gi";
import './SideBar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    const navigate = useNavigate()

    const { t } = useTranslation();
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <GiAbstract066 size={'3em'} color={"00bfff"} />
                        <span style={{ cursor: "pointer" }}
                            onClick={() => navigate("/")}>
                            {t("sidebar.title")}
                        </span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                            suffix={<span className="badge red">New</span>}
                        >
                            {t("sidebar.dashboard")}
                            <Link to="/admin" />

                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={< FaList />}
                            title={t("sidebar.features")}
                        >
                            <MenuItem> {t("sidebar.menu1")}
                                <Link to="/admin/manager-user" />
                            </MenuItem>
                            <MenuItem > {t("sidebar.menu2")}
                                <Link to="/admin/manager-quiz" />
                            </MenuItem>
                            <MenuItem>{t("sidebar.menu3")}
                                <Link to="/admin/manager-questions" />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/tamh1203/hoidanit_basic"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', }} >
                                <FaGithub size="1.2em" />View Source Code
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar >
        </>
    )
}

export default SideBar;