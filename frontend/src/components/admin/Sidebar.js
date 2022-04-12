import React from 'react';
import './sidebar.css';
import logo from '../../images/logo.png';
import { TreeItem, TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddIcon from '@material-ui/icons/Add';
import ImportExportIcon from '@material-ui/icons/ExpandMore';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { Link } from 'react-router-dom';
import ListAltIcon from '@material-ui/icons/ListAlt';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/">
                <img src={logo} alt="Ecommerce" />
            </Link>
            <Link to="/admin/dashboard">
                <p>
                    <DashboardIcon /> Dashboard
                </p>
            </Link>
            <Link>
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ImportExportIcon />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeView
                                nodeId="2"
                                label="All"
                                icon={<PostAddIcon />}
                            />
                        </Link>
                        <Link to="/admin/product">
                            <TreeView
                                nodeId="3"
                                label="Create"
                                icon={<AddIcon />}
                            />
                        </Link>
                        <Link to="/admin/orders">
                            <p>
                                <ListAltIcon /> Orders
                            </p>
                        </Link>
                        <Link to="/admin/users">
                            <p>
                                <PeopleIcon /> Users
                            </p>
                        </Link>
                        <Link to="/admin/reviews">
                            <p>
                                <RateReviewIcon /> Reviews
                            </p>
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
        </div>
    );
};

export default Sidebar;
