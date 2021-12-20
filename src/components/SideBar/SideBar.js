import React from 'react';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Icon from "awesome-react-icons";
import { useHistory,useLocation } from "react-router-dom";

const SideBar = () => {
    const history = useHistory();
    const location = useLocation();
    return (
        <div className="mt-5 " >
        <Navigation
            // you can use your own router's api to get pathname
            activeItemId={location.pathname}
            onSelect={({ itemId }) => {
                history.push(itemId);
              }}
            items={[
              {
                title: 'Author',
                itemId: '/author',
                // you can use your own custom Icon component as well
                // icon is optional
                elemBefore: () => <Icon name="users" />,
              },
              {
                title: 'Favorite Author',
                itemId: '/favoriteAuthor',
                elemBefore: () => <Icon name="heart" />,
               
              },
              
            ]}
          />
      </div>
    );
};

export default SideBar;