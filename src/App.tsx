import React from 'react';
import Mar from './Components/Mar';
import SideNav from './Components/Nav/SideBar/SideNav';
import TopNav from './Components/Nav/TopMenu/TopNav';

export default class App extends React.Component {
  render() {
    return (
      <div className="grid grid-areas-main h-full grid-cols-maxContent">
        <TopNav className="grid-in-topNav"></TopNav>
        <SideNav className="grid-in-sideBar"></SideNav>
        <Mar className="grid-in-main"/>
      </div>
    )
  }
}
