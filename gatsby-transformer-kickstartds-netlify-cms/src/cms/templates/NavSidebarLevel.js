import React from 'react';
import PropTypes from 'prop-types';

import NavSidebarItem from '../templates/NavSidebarItem';

export const NavSidebarLevel = ({
    level,
    links,
}) => (
    <ul class={'nav-sidebar__list nav-sidebar__list--level-'+level}>
        {links.map((link, index) => {
            return (
                <NavSidebarItem key={'navigation'+index} level={level} link={link} />
            )
        })}
    </ul>
);

NavSidebarLevel.propTypes = {
    level: PropTypes.number,
    links: PropTypes.array
};

export default NavSidebarLevel;