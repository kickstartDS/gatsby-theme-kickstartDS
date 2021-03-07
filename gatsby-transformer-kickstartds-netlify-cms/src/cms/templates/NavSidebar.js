import React from 'react';
import PropTypes from 'prop-types';

import NavSidebarLevel from '../templates/NavSidebarLevel';

const level = 1;

export const NavSidebar = ({
  links,
}) => (
    <nav class="nav-sidebar" id="nav-sidebar" aria-label="Hauptnavigation" data-component="base.nav-sidebar">
        <NavSidebarLevel level={level} links={links} />
    </nav>
);

NavSidebar.propTypes = {
    links: PropTypes.array
};

export default NavSidebar;