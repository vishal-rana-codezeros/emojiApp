import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { Login } from '../../views/Pages/Login/Login'
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import { logout } from '../../action/auth.action';
import { connect } from 'react-redux';
import {withRouter} from "react-router"

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  componentWillMount() {
    const { isAuthenticate } = this.props.Auth
    if (!isAuthenticate) {
      this.props.history.push('/Login');
    }
  }

  onClickToLogout = (e) => {
    this.props.logout();
  }

  render() {
    const { children, ...attributes } = this.props;

    const { isAuthenticate } = this.props.Auth
    if (!isAuthenticate) {
      this.props.history.push('/Login');
    }

    

    var { image, fullName } = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):{};

    // if(image==""){
    //   return "";
    // }

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        {/* <AppNavbarBrand
        />  */}

        {/* <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        /> */}
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <label className="logoLabelEffect"><b>Emoji Admin</b></label>
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav  className="adminNamecss">
              <h5 ><label >{fullName}</label></h5>
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem><img src={image? image : `../../assets/img/avatars/default.png`} className="img-avatar profilecustom" alt={fullName ? fullName : ''} /></DropdownItem>
              <DropdownItem className="logoutcss" onClick={this.onClickToLogout}><i className="fa fa-lock "></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  Auth: state.Auth
})

export default withRouter(connect(mapStateToProps, { logout })(DefaultHeader));
